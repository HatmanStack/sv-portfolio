---
title: 'WordPress Has a Security Problem'
link: 'https://medium.com/@HatmanStack/wordpress-has-a-security-problem-76d9587bc7a8'
description: 'WordPress had 10,575 vulnerabilities in 2025. 29 per day. 95% from plugins.'
date: 'Jan 5, 2026'
time: '3 min read'
---

![WordPress Has a Security Problem](/blog/wordpress.webp)

WordPress powers 43% of the web. It also accounts for over 90% of CMS-related security incidents.

This isn't an opinion piece. It's a tally.

## By the Numbers

**2025:**
- 10,575 documented vulnerabilities across WordPress core, plugins, and themes
- 27% increase over 2024's 8,286
- 95% were plugin vulnerabilities

That's 29 new vulnerabilities per day. Every day.

## The Plugin Ecosystem is the Attack Surface

WordPress core is reasonably secure. The issue is the 60,000+ plugins that site owners install and forget about.

- The average WordPress site runs 20-30 plugins
- 52% of plugins with known vulnerabilities are still installed on live sites 90 days after disclosure
- Many site owners don't know a plugin was compromised until their site is defaced or blacklisted

## "Just Keep it Updated" Isn't a Strategy

The standard advice is to enable auto-updates. But:

- Plugin updates regularly break sites
- Many plugins are abandoned (no updates coming)
- Updates don't help when you're in the 3-day exploitation window

Running WordPress responsibly requires constant vigilance. You need to monitor security feeds, test updates in staging, maintain backups, and pray your hosting provider's WAF catches what you miss.

That's not a website. That's a part-time job.

## The Attack Economics Favor Attackers

WordPress's market share makes it the obvious target. Write one exploit, potentially hit millions of sites. Attackers don't need to find your site—they scan the entire internet for vulnerable plugin versions.

This isn't theoretical. Automated scanners probe WordPress sites constantly. The comments section of this site's author was recently hit with the exact probes we're describing—SQL injection tests, template injection attempts, PHP code execution payloads. All automated. All from the same IP. All in one afternoon.

## The Alternative Isn't Hard

Most WordPress sites are brochure sites, blogs, or simple storefronts. They don't need:

- A database
- Server-side PHP
- A plugin for every feature

A static site generator eliminates this entire attack surface. No PHP, no MySQL, no plugins, no updates, no vulnerabilities.

Same result. Zero maintenance. Nothing to exploit.

The tooling has caught up. Astro, Hugo, 11ty, Next.js—these aren't experimental anymore. They're production-ready, often faster, and they deploy for free on Cloudflare Pages, Vercel, or Netlify.

## Who Should Still Use WordPress?

No one.

## See for Yourself

Check the <a href="https://tracker.hatstack.fun">live vulnerability tracker</a> for current counts updated daily from Wordfence Intelligence data.
