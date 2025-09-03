<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import {
		GridSolid,
		RectangleListSolid,
		ArrowUpRightFromSquareSolid,
		ComputerSpeakerSolid
	} from 'flowbite-svelte-icons';
	import { page } from '$app/state';
	let activeUrl = $state(page.url.pathname);

	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
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
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-full"
		position="absolute"
		activeClass="p-2"
		nonActiveClass="p-2"
	>
		<SidebarGroup>
			<SidebarItem label="Forms" href="/forms">
				{#snippet icon()}
					<RectangleListSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Ref forwarding" {spanClass} href="/ref">
				{#snippet icon()}
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Weather board" {spanClass} href="/dashboard">
				{#snippet icon()}
					<ArrowUpRightFromSquareSolid class="h-6 w-6 shrink-0" />
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Modules" {spanClass} href="/module-route">
				{#snippet icon()}
					<ComputerSpeakerSolid class="h-6 w-6 shrink-0" />
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>
</div>
