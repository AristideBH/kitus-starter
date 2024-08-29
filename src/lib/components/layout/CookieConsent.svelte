<script lang="ts">
	import { onMount } from 'svelte';
	import * as CookieConsent from 'vanilla-cookieconsent';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';

	const config: CookieConsent.CookieConsentConfig = {
		categories: {
			necessary: {
				enabled: true,
				readOnly: true
			},
			analytics: {
				autoClear: {
					cookies: [
						{
							name: /^_ga/ // regex: match all cookies starting with '_ga'
						},
						{
							name: '_gid' // string: exact cookie name
						}
					]
				},

				// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
				services: {
					ga: {
						label: 'Google Analytics',
						onAccept: () => {},
						onReject: () => {}
					},
					another: {
						label: 'Another service',
						onAccept: () => {},
						onReject: () => {}
					}
				}
			},
			ads: {}
		},

		onFirstConsent: ({ cookie }) => {
			console.log('onFirstConsent fired', cookie);
		},

		onConsent: ({ cookie }) => {
			console.log('onConsent fired!', cookie, CookieConsent.getUserPreferences());
		},

		onChange: ({ changedCategories, changedServices }) => {
			console.log('onChange fired!', changedCategories, changedServices);
		},

		onModalReady: ({ modalName }) => {
			console.log('ready:', modalName);
		},

		onModalShow: ({ modalName }) => {
			console.log('visible:', modalName);
		},

		onModalHide: ({ modalName }) => {
			console.log('hidden:', modalName);
		},

		guiOptions: {
			consentModal: {
				layout: 'cloud inline',
				position: 'top center',
				equalWeightButtons: true,
				flipButtons: true
			},
			preferencesModal: {
				layout: 'box',
				equalWeightButtons: true,
				flipButtons: false
			}
		},

		language: {
			default: 'fr',
			translations: {
				fr: {
					consentModal: {
						label: 'Consentement aux cookies',
						title: "Bonjour voyageur, c'est l'heure des cookies!",
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
						acceptAllBtn: 'Tout accepter',
						acceptNecessaryBtn: 'Tout rejeter',
						showPreferencesBtn: 'Gérer les préférences',
						footer:
							'<a href="#link">Politique de confidentialité</a>\n<a href="#link">Termes et conditions</a>'
					},
					preferencesModal: {
						title: 'Préférences de cookies',
						acceptAllBtn: 'Tout accepter',
						acceptNecessaryBtn: 'Tout rejeter',
						savePreferencesBtn: 'Sauvegarder les préférences',
						closeIconLabel: 'Fermer la modale',
						serviceCounterLabel: 'Services',
						sections: [
							{
								title: 'Utilisation des Cookies',
								description:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
							},
							{
								title:
									'Cookies Strictement Nécessaires <span class="pm__badge">Toujours Activé</span>',
								description:
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
								linkedCategory: 'necessary'
							},
							{
								title: 'Cookies Analytiques',
								description: '',
								linkedCategory: 'analytics',
								cookieTable: {
									headers: {
										name: 'Nom',
										description: 'Description',
										Service: 'Service'
									},
									body: [
										{
											name: '_ga_*, _gid',
											description: 'Used to track you ...',
											Service: 'Google Analytics'
										}
									]
								}
							},
							{
								title: "Plus d'informations",
								description:
									'For any query in relation to my policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.'
							}
						]
					}
				}
			}
		}
	};

	/**
	 * Only run plugin on the client side
	 */
	onMount(() => {
		CookieConsent.run(config);
	});
</script>

<!-- <button on:click={CookieConsent.showPreferences}>Open consent preferences</button> -->
