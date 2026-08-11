<script>
  import Icon from "@iconify/svelte";
  import { githubUrl, instagramUrl, linkedInUrl } from "$lib/contactLinks";
</script>

<p class="px-4 py-2 bg-white text-slate-950 font-medium rounded-full">
  Happy to connect :)
</p>
<div class="text_gradient">
  <a
    href={linkedInUrl}
    aria-label="LinkedIn profile"
    target="_blank"
    rel="noreferrer noopener"
    class="hero_text_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
  >
    <i class="fa-brands fa-linkedin-in" />
  </a>
</div>
<div class="text_gradient">
  <a
    href={instagramUrl}
    aria-label="Instagram profile"
    target="_blank"
    rel="noreferrer noopener"
    class="hero_text_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
  >
    <i class="fa-brands fa-instagram" />
  </a>
</div>
<div class="text_gradient">
  <a
    href={githubUrl}
    aria-label="GitHub profile"
    target="_blank"
    rel="noreferrer noopener"
    class="hero_text_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
  >
    <i class="fa-brands fa-github" />
  </a>
</div>
<div class="text_gradient">
  <a
    href="mailto:echoshihtw@gmail.com"
    class="hero_text_white hover:bg-transparent hover:text-transparent"
    target="_blank"
    rel="noreferrer noopener"
  >
    echoshihtw@gmail.com
  </a>
</div>
<div class="flex items-center gap-2">
  <a
    href="https://github.com/echoshihtw/portfolio"
    aria-label="Portfolio source code on GitHub"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
  >
    <span class="text_gradient hover:font-bold">
      <i class="fa-solid fa-code"></i>
    </span>
  </a>
  <span class="text-gray-400">made with</span>
  <!--      svelte-->
  <a
    href="https://kit.svelte.dev/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
    aria-label="SvelteKit"
  >
    <Icon icon="devicon:svelte" />
  </a>
  <a
    href="https://kit.svelte.dev/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#ff3e00]"
    aria-label="SvelteKit"
  >
    <Icon icon="devicon-plain:svelte" />
  </a>
  <!--      tailwind-->
  <a
    href="https://tailwindcss.com/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#38bdf8]"
    aria-label="Tailwind CSS"
  >
    <Icon icon="simple-icons:tailwindcss" />
  </a>
  <a
    href="https://tailwindcss.com/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
    aria-label="Tailwind CSS"
  >
    <Icon icon="devicon:tailwindcss" />
  </a>
  <!--      typescript-->

  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#3178c6]"
    aria-label="TypeScript"
  >
    <Icon icon="simple-icons:typescript" />
  </a>
  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
    aria-label="TypeScript"
  >
    <Icon icon="logos:typescript-icon" />
  </a>
</div>
