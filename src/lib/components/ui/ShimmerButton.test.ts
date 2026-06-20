import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ShimmerButton from './ShimmerButton.svelte';

describe('ShimmerButton - Rendering', () => {
	test('renders as button element when no href', () => {
		const { getByRole } = render(ShimmerButton, { props: {} });

		const button = getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute('type', 'button');
		expect(button).toHaveClass('shimmer-button', 'primary');
	});

	test('renders as anchor with link attributes when href provided', () => {
		const { getByRole } = render(ShimmerButton, {
			props: { href: 'https://example.com', target: '_blank', rel: 'noopener noreferrer' }
		});

		const link = getByRole('link');
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	test('applies the secondary variant class', () => {
		const { getByRole } = render(ShimmerButton, { props: { variant: 'secondary' } });

		expect(getByRole('button')).toHaveClass('secondary');
	});
});

describe('ShimmerButton - Animated border', () => {
	test('renders the rotating shimmer by default', () => {
		const { container } = render(ShimmerButton, { props: {} });
		expect(container.querySelector('.shimmer-container')).not.toBeNull();
	});

	test('omits the rotating shimmer when animated is false', () => {
		const { container } = render(ShimmerButton, { props: { animated: false } });
		expect(container.querySelector('.shimmer-container')).toBeNull();
	});
});

describe('ShimmerButton - Interactions', () => {
	test('calls onclick when clicked', async () => {
		const onclick = vi.fn();
		const { getByRole } = render(ShimmerButton, { props: { onclick } });

		await fireEvent.click(getByRole('button'));

		expect(onclick).toHaveBeenCalled();
	});
});
