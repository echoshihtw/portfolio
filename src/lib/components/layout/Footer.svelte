<script>
  import { githubUrl, linkedInUrl } from "$lib/contactLinks.ts";
  import Icon from "@iconify/svelte";
</script>

<footer
  id="footer"
  class="w-full py-20 sm:py-32 bg-black border-t border-solid border-lime-950 flex flex-col gap-4 sm:gap-8 justify-center items-center relative"
>
  <p class="px-4 py-2 bg-white text-slate-950 font-medium rounded-full">
    Happy to connect :)
  </p>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div
      class="text_gradient flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto"
    >
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noreferrer noopener"
        class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
      >
        <i class="fa-brands fa-linkedin-in" />
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer noopener"
        class="text_bg_white hover:bg-transparent hover:dark:text-lime-400 duration-200"
      >
        <i class="fa-brands fa-github" />
      </a>
    </div>
    <p class="mx-auto text-sm opacity-70 text-gray-400">or</p>
    <p class="text_gradient">
      <b class="pr-2 text_bg_white dark:text-white text-gray-500">Email</b>
      <a
        href="mailto:echoshihtw@gmail.com"
        class="text_bg_white hover:bg-transparent hover:text-transparent"
        target="_blank"
        rel="noreferrer noopener"
      >
        echoshihtw@gmail.com
      </a>
    </p>
    <p class="text_gradient">
      <b class="pr-2 text_bg_white dark:text-white text-gray-500">CV</b>
      <a
        href="mailto:echoshihtw@gmail.com"
        class="text_bg_white hover:bg-transparent hover:text-transparent"
        target="_blank"
        rel="noreferrer noopener"
      >
        echoshihtw@gmail.com
      </a>
    </p>
    <div class="flex items-center gap-2 pt-20">
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
  </div>
</footer>
