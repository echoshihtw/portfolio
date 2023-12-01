<script>
  const githubUrl = "https://github.com/echoshihtw";
  const linkedInUrl = "https://www.linkedin.com/in/echoshihtw/";
</script>

<footer
  class="w-full py-20 sm:py-32 bg-black border-t border-solid border-violet-950 flex flex-col gap-4 sm:gap-8 justify-center items-center"
>
  <p class="px-4 py-2 bg-white text-slate-950 font-medium">
    Connect with me &darr;
  </p>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div
      class="flex items-center gap-4 sm:gap-6 text-2xl sm:text-3xl md:text-4xl mx-auto"
    >
      <a
        href={githubUrl}
        target="_blank"
        class="text-white hover:text-violet-400 duration-200"
      >
        <i class="fa-brands fa-linkedin-in" />
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        class="text-white hover:text-violet-400 duration-200"
      >
        <i class="fa-brands fa-github" />
      </a>
    </div>
    <p class="mx-auto text-sm opacity-70">or</p>
    <p>
      <b class="pr-2">Email</b>
      echoshihtw@gmail.com
    </p>
    <!--    <p>-->
    <!--      <b class="pr-2">GitHub</b>-->
    <!--      <a-->
    <!--        href={githubUrl}-->
    <!--        target="_blank"-->
    <!--        class="text-violet-400"-->
    <!--      >-->
    <!--        <span>-->
    <!--          echoshihtw-->
    <!--          <sup>-->
    <!--            <i-->
    <!--              class="fa-solid fa-arrow-up-right-from-square text-xs scale-[75%]"-->
    <!--            />-->
    <!--          </sup>-->
    <!--        </span>-->
    <!--      </a>-->
    <!--    </p>-->
    <!--    <p>-->
    <!--      <b class="pr-2">LinkedIn</b>-->
    <!--      <a-->
    <!--        href={linkedInUrl}-->
    <!--        target="_blank"-->
    <!--        class="text-violet-400"-->
    <!--      >-->
    <!--        Echo Shih-->
    <!--        <sup><span class="text-xs scale-75 pl-0.5"></span></sup>-->
    <!--      </a>-->
    <!--    </p>-->
  </div>
</footer>
