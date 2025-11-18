import { useSound } from "$lib/hooks/useSound";
import click from "$lib/sounds/click.wav";

const click_sound = useSound(click, ["click"]);

/**
 * Applies click sound to all anchor links within a node
 * @param {HTMLElement} node - DOM node to apply click sounds to
 * @returns {{ update: () => void }} Svelte action return object
 */
export function applyClickSound(node) {
  const links = node.querySelectorAll('a');
  links.forEach((/** @type {HTMLElement} */ link) => {
    if (click_sound) {
      click_sound(link);
    }
  });

  return {
    update() {
      const newLinks = node.querySelectorAll('a');
      newLinks.forEach((/** @type {HTMLElement} */ link) => {
        if (click_sound) {
          click_sound(link);
        }
      });
    }
  };
}