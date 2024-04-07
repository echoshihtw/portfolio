<script>
  import { githubUrl, linkedInUrl } from "$lib/contactLinks.ts";
</script>

<footer
  class="w-full py-20 sm:py-32 bg-black border-t border-solid border-lime-950 flex flex-col gap-4 sm:gap-8 justify-center items-center"
>
  <p class="px-4 py-2 bg-white text-slate-950 font-medium">
    Happy to connect :)
  </p>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div
      class="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto"
    >
      <a
        href={linkedInUrl}
        target="_blank"
        class="text-white hover:text-violet-800 hover:dark:text-lime-400 duration-200"
      >
        <i class="fa-brands fa-linkedin-in" />
      </a>
      <a
        href={githubUrl}
        target="_blank"
        class="text-white hover:text-lime-400 duration-200"
      >
        <i class="fa-brands fa-github" />
      </a>
    </div>
    <p class="mx-auto text-sm opacity-70">or</p>
    <p>
      <b class="pr-2">Email</b>
      <a href="mailto:echoshihtw@gmail.com">echoshihtw@gmail.com</a>
    </p>
  </div>
</footer>
