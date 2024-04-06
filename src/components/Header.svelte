<script lang="ts">
  import ThemeSwitch from "./ThemeSwitch.svelte";

  export let scrollPosition: number;

  let tabs = [
    { name: "Projects", link: "#projects" },
    { name: "About", link: "#about" },
    { name: "CV", link: "#cv" },
    { name: "Github", link: "https://github.com/echoshihtw" },
  ];
</script>

<header
  class={"w-full sticky z-[10] top-0 duration-200 px-6 border-b border-solid " +
    (scrollPosition > 60
      ? "py-4 bg-slate-950 border-lime-950"
      : "py-6 bg-transparent border-transparent")}
>
  <div class={"w-full max-w-[1400px] flex items-center justify-between m-auto"}>
    <h1>
      <b>Echo</b>
      Shih
    </h1>
    <div class="hidden md:flex items-center gap-4">
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class="duration-200 toggle_hover_font_color"
          target={index === 3 ? "_blank" : ""}
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <button
        class="dark:blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
      >
        <span
          class="absolute toggle_btn_hover_color top-0 right-full w-full h-full opacity-20 group-hover:translate-x-full z-0 duration-200"
        />
        <span class="relative z-9">Get in touch</span>
      </button>
      <ThemeSwitch />
    </div>
  </div>
</header>
