<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import {
		GridSolid,
		RectangleListSolid,
		ArrowUpRightFromSquareSolid,
		ComputerSpeakerSolid,
		LockOpenSolid,
		ReplyAllSolid,
		UploadSolid
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
				<RectangleListSolid
					class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
				/>
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
			<SidebarItem label="Layout breaking out" {spanClass} href="/layout-route">
				{#snippet icon()}
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fill-rule="evenodd"
							d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z"
							clip-rule="evenodd"
						/>
						<path
							d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z"
						/>
					</svg>
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Key route" {spanClass} href="/key-route">
				{#snippet icon()}
					<LockOpenSolid class="h-6 w-6 shrink-0" />
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Bind route" {spanClass} href="/bind-route">
				{#snippet icon()}
					<ReplyAllSolid class="h-6 w-6 shrink-0" />
				{/snippet}
			</SidebarItem>
			<SidebarItem label="Load route" {spanClass} href="/load-route">
				{#snippet icon()}
					<UploadSolid class="h-6 w-6 shrink-0" />
				{/snippet}
			</SidebarItem>
		</SidebarGroup>
	</Sidebar>
</div>
