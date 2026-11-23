<script lang="ts">
	import { authClient } from '#lib/auth-client.js';
	import { goto } from '$app/navigation';
	const session = authClient.useSession();

	/* signIn handler code stolen from better auth documentation */
	let email = $state('');
	let password = $state('');
	let error = $state('');

	async function handleSignIn(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		const { error: err } = await authClient.signIn.email({ email, password });
		if (err) {
			error = err.message ?? 'Sign in failed';
			return;
		}
		//on successful login, redirect to todos list
		await goto('/todos');
	}
</script>

<section class="section">
	<div class="columns is-centered">
		<div class="column is-half">
			<div class="box content">
				<div class="is-flex is-align-items-baseline">
					<h1 class="is-size-1 has-text-weight-bold mb-0 mr-4" lang="fr">faire</h1>
					<span class="is-size-4 has-text-weight-light">/fɛʀ/</span>
				</div>

				<h2 class="is-size-5 is-italic has-text-weight-normal mt-1">a to-do app</h2>

				<p class="mb-0">
					<span class="is-italic">French</span>
					|
					<span class="is-uppercase is-size-7 has-text-weight-semibold">verb</span>
				</p>

				<hr />

				<ol>
					<li>
						<span class="has-text-weight-semibold">to do</span>
						<p class="mt-1 mb-0">
							<span class="is-italic" lang="fr">J'ai tellement de choses à faire.</span>
							I have so much to do.
						</p>
					</li>
					<li>
						<span class="has-text-weight-semibold">to make</span>
						<p class="mt-1 mb-0">
							<span class="is-italic" lang="fr">Je vais faire une liste.</span>
							I will make a list.
						</p>
					</li>
				</ol>
			</div>
		</div>
	</div>
	<div class="columns is-centered">
		<div class="column is-one-quarter">
			{#if $session.data}
				<div>
					<p>
						{$session.data.user.name}
					</p>
					<button
						onclick={async () => {
							await authClient.signOut();
						}}
					>
						Sign Out
					</button>
				</div>
			{:else}
				<form onsubmit={handleSignIn}>
					<div class="field">
						<div>
							{#if error}<p>{error}</p>{/if}
						</div>
						<div class="control mb-2">
							<input class="input" bind:value={email} type="email" placeholder="Email" required />
						</div>
						<div class="control mb-2">
							<input
								class="input"
								bind:value={password}
								type="password"
								placeholder="Password"
								required
							/>
						</div>
						<div class="control">
							<button class="button is-primary is-light is-fullwidth">Sign In</button>
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>