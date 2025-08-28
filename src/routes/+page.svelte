<script lang="ts">
  import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from "flowbite-svelte";
  import { ChartOutline, GridSolid, MailBoxSolid, UserSolid ,RectangleListSolid} from "flowbite-svelte-icons";
  import { page } from "$app/state";
  let activeUrl = $state(page.url.pathname);

  const spanClass = "flex-1 ms-3 whitespace-nowrap";
  const demoSidebarUi = uiHelpers();
  let isDemoOpen = $state(false);
  const closeDemoSidebar = demoSidebarUi.close;
  $effect(() => {
    isDemoOpen = demoSidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative">
  <Sidebar {activeUrl} backdrop={false} isOpen={isDemoOpen} closeSidebar={closeDemoSidebar} params={{ x: -50, duration: 50 }} class="z-50 h-full" position="absolute" activeClass="p-2" nonActiveClass="p-2">
    <SidebarGroup>
      <SidebarItem label="Forms" href="/forms">
        {#snippet icon()}
<RectangleListSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        {/snippet}
      </SidebarItem>
      <SidebarItem label="Ref forwarding" {spanClass} href="/ref">
        {#snippet icon()}
          <GridSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        {/snippet}
      </SidebarItem>
      <SidebarItem label="Inbox" {spanClass} href="/">
        {#snippet icon()}
          <MailBoxSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        {/snippet}
        {#snippet subtext()}
          <span class="bg-primary-200 text-primary-600 dark:bg-primary-900 dark:text-primary-200 ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full p-3 text-sm font-medium">3</span>
        {/snippet}
      </SidebarItem>
      <SidebarItem label="Sidebar" href="/components/sidebar">
        {#snippet icon()}
          <UserSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        {/snippet}
      </SidebarItem>
    </SidebarGroup>
  </Sidebar>
</div>