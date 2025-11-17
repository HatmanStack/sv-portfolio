import { useSound } from "$lib/hooks/useSound";
import click from "$lib/sounds/click.wav";

const click_sound = useSound(click, ["click"]);

export function applyClickSound(node) {
  const links = node.querySelectorAll('a');
  links.forEach(link => {
    click_sound(link);
  });

  return {
    update() {
      const newLinks = node.querySelectorAll('a');
      newLinks.forEach(link => {
        click_sound(link);
      });
    }
  };
}