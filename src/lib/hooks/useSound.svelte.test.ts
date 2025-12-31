/**
 * Sound Hook Tests
 *
 * Tests for createSoundStore and useSoundAction sound hooks.
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { createSoundStore, useSoundAction } from './useSound.svelte';

describe('Sound Hooks', () => {
	let mockAudio: any;

	beforeEach(() => {
		// Create a mock audio element with getter/setter properties
		let currentTime = 0;
		let volume = 1;
		let loop = false;

		mockAudio = {
			play: vi.fn().mockResolvedValue(undefined),
			pause: vi.fn(),
			load: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			get volume() {
				return volume;
			},
			set volume(val) {
				volume = val;
			},
			get loop() {
				return loop;
			},
			set loop(val) {
				loop = val;
			},
			preload: 'auto',
			get currentTime() {
				return currentTime;
			},
			set currentTime(val) {
				currentTime = val;
			}
		};

		// Mock the global Audio constructor - use vi.fn() for spy functionality
		(globalThis as any).Audio = vi.fn(function () {
			return mockAudio;
		}) as any;
		(globalThis as any).window = {} as any;
	});

	describe('createSoundStore', () => {
		test('initializes with audio element', () => {
			const soundStore = createSoundStore('/test-sound.mp3');

			expect(soundStore.audio).toBeDefined();
			expect((globalThis as any).Audio).toHaveBeenCalledWith('/test-sound.mp3');
		});

		test('sets volume from options', () => {
			createSoundStore('/test-sound.mp3', { volume: 0.5 });

			expect(mockAudio.volume).toBe(0.5);
		});

		test('sets loop from options', () => {
			createSoundStore('/test-sound.mp3', { loop: true });

			expect(mockAudio.loop).toBe(true);
		});

		test('sets preload from options', () => {
			createSoundStore('/test-sound.mp3', { preload: true });

			expect(mockAudio.preload).toBe('auto');
		});

		test('registers canplaythrough event listener', () => {
			createSoundStore('/test-sound.mp3');

			expect(mockAudio.addEventListener).toHaveBeenCalledWith('canplaythrough', expect.any(Function));
		});

		test('registers error event listener', () => {
			createSoundStore('/test-sound.mp3');

			expect(mockAudio.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));
		});

		test('isLoaded is false initially', () => {
			const soundStore = createSoundStore('/test-sound.mp3');

			expect(soundStore.isLoaded).toBe(false);
		});

		test('isLoaded becomes true after canplaythrough event', () => {
			const soundStore = createSoundStore('/test-sound.mp3');

			// Simulate canplaythrough event
			const canPlayHandler = mockAudio.addEventListener.mock.calls.find(
				(call: any) => call[0] === 'canplaythrough'
			)?.[1];

			canPlayHandler?.();

			expect(soundStore.isLoaded).toBe(true);
		});

		test('error is null initially', () => {
			const soundStore = createSoundStore('/test-sound.mp3');

			expect(soundStore.error).toBeNull();
		});

		test('error is set when audio fails to load', () => {
			const soundStore = createSoundStore('/test-sound.mp3');

			// Simulate error event
			const errorHandler = mockAudio.addEventListener.mock.calls.find(
				(call: any) => call[0] === 'error'
			)?.[1];

			errorHandler?.({ message: 'Load failed' });

			expect(soundStore.error).not.toBeNull();
			expect(soundStore.error?.message).toContain('Failed to load audio');
		});

		describe('play method', () => {
			test('calls audio.play when loaded', async () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				// Simulate loaded state
				const canPlayHandler = mockAudio.addEventListener.mock.calls.find(
					(call: any) => call[0] === 'canplaythrough'
				)?.[1];
				canPlayHandler?.();

				await soundStore.play();

				expect(mockAudio.play).toHaveBeenCalled();
			});

			test('resets currentTime before playing', async () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				// Simulate loaded state
				const canPlayHandler = mockAudio.addEventListener.mock.calls.find(
					(call: any) => call[0] === 'canplaythrough'
				)?.[1];
				canPlayHandler?.();

				mockAudio.currentTime = 5;
				await soundStore.play();

				expect(mockAudio.currentTime).toBe(0);
			});

			test('warns when audio not loaded', async () => {
				const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
				const soundStore = createSoundStore('/test-sound.mp3');

				await soundStore.play();

				expect(consoleSpy).toHaveBeenCalledWith('Audio not ready for playback');
				consoleSpy.mockRestore();
			});
		});

		describe('pause method', () => {
			test('calls audio.pause', () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				soundStore.pause();

				expect(mockAudio.pause).toHaveBeenCalled();
			});
		});

		describe('stop method', () => {
			test('pauses and resets currentTime', () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				mockAudio.currentTime = 10;
				soundStore.stop();

				expect(mockAudio.pause).toHaveBeenCalled();
				expect(mockAudio.currentTime).toBe(0);
			});
		});

		describe('setVolume method', () => {
			test('sets volume to specified value', () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				soundStore.setVolume(0.7);

				expect(mockAudio.volume).toBe(0.7);
			});

			test('clamps volume to maximum of 1', () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				soundStore.setVolume(1.5);

				expect(mockAudio.volume).toBe(1);
			});

			test('clamps volume to minimum of 0', () => {
				const soundStore = createSoundStore('/test-sound.mp3');

				soundStore.setVolume(-0.5);

				expect(mockAudio.volume).toBe(0);
			});
		});
	});

	describe('useSoundAction', () => {
		let mockElement: any;

		beforeEach(() => {
			mockElement = {
				addEventListener: vi.fn(),
				removeEventListener: vi.fn()
			};
		});

		test('attaches click listener to element', () => {
			const action = useSoundAction('/test-sound.mp3');
			action(mockElement);

			expect(mockElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
		});

		test('click prevents default and triggers playback', () => {
			const action = useSoundAction('/test-sound.mp3');
			action(mockElement);

			// Simulate loaded state
			const canPlayHandler = mockAudio.addEventListener.mock.calls.find(
				(call: any) => call[0] === 'canplaythrough'
			)?.[1];
			canPlayHandler?.();

			// Get the click handler and call it
			const clickHandler = mockElement.addEventListener.mock.calls.find(
				(call: any) => call[0] === 'click'
			)?.[1];

			const mockEvent = { preventDefault: vi.fn() };
			clickHandler?.(mockEvent);

			expect(mockEvent.preventDefault).toHaveBeenCalled();
		});

		test('destroy removes event listener', () => {
			const action = useSoundAction('/test-sound.mp3');
			const result = action(mockElement);

			const clickHandler = mockElement.addEventListener.mock.calls.find(
				(call: any) => call[0] === 'click'
			)?.[1];

			result.destroy();

			expect(mockElement.removeEventListener).toHaveBeenCalledWith('click', clickHandler);
		});

		test('respects sound options', () => {
			const action = useSoundAction('/test-sound.mp3', { volume: 0.3, loop: true });
			action(mockElement);

			expect(mockAudio.volume).toBe(0.3);
			expect(mockAudio.loop).toBe(true);
		});
	});
});
