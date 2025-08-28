<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let { children } = $props();
	import { DarkMode } from "flowbite-svelte";
	import { Navbar, NavBrand,  NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownGroup } from "flowbite-svelte";
</script>

<Navbar>
  <NavBrand href="/">
    <img src="{base}/favicon.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src="{base}/profile.png" alt="User Avatar" class="h-8 w-8" />
    <NavHamburger />
	<div class="ml-4">
    	<DarkMode />
	</div>
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">Bonnie Green</span>
      <span class="block truncate text-sm font-medium">name@flowbite.com</span>
    </DropdownHeader>
    <DropdownGroup>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
    </DropdownGroup>
    <DropdownHeader>Sign out</DropdownHeader>
  </Dropdown>

</Navbar>
{@render children()}


