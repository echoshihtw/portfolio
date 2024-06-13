<script>
  import Icon from "@iconify/svelte";
  import { githubUrl, linkedInUrl } from "$lib/contactLinks.ts";
</script>

<p class="px-4 py-2 bg-white text-slate-950 font-medium rounded-full">
  Happy to connect :)
</p>
<div class="text_gradient">
  <a
    href={linkedInUrl}
    target="_blank"
    rel="noreferrer noopener"
    class="hero_text_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
  >
    <i class="fa-brands fa-linkedin-in" />
  </a>
</div>
<div class="text_gradient">
  <a
    href={githubUrl}
    target="_blank"
    rel="noreferrer noopener"
    class="hero_text_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
  >
    <i class="fa-brands fa-github" />
  </a>
</div>
<b class="pr-2 hero_text_white dark:text-white text-gray-500">Email</b>
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
  <span class="text-gray-400">made with</span>
  <!--      svelte-->
  <a
    href="https://kit.svelte.dev/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
  >
    <Icon icon="devicon:svelte" />
  </a>
  <a
    href="https://kit.svelte.dev/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#ff3e00]"
  >
    <Icon icon="devicon-plain:svelte" />
  </a>
  <!--      tailwind-->
  <a
    href="https://tailwindcss.com/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#38bdf8]"
  >
    <Icon icon="simple-icons:tailwindcss" />
  </a>
  <a
    href="https://tailwindcss.com/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
  >
    <Icon icon="devicon:tailwindcss" />
  </a>
  <!--      typescript-->

  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer noopener"
    class="dark:hidden text-gray-400 hover:text-[#3178c6]"
  >
    <Icon icon="simple-icons:typescript" />
  </a>
  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer noopener"
    class="hidden dark:block"
  >
    <Icon icon="logos:typescript-icon" />
  </a>
</div>
