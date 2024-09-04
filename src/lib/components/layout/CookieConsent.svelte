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
			// console.log('onFirstConsent fired', cookie);
		},

		onConsent: ({ cookie }) => {
			// console.log('onConsent fired!', cookie, CookieConsent.getUserPreferences());
		},

		onChange: ({ changedCategories, changedServices }) => {
			// console.log('onChange fired!', changedCategories, changedServices);
		},

		onModalReady: ({ modalName }) => {
			// console.log('ready:', modalName);
		},

		onModalShow: ({ modalName }) => {
			// console.log('visible:', modalName);
		},

		onModalHide: ({ modalName }) => {
			// console.log('hidden:', modalName);
		},

		guiOptions: {
			consentModal: {
				layout: 'cloud inline',
				position: 'bottom center',
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
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: 'We use cookies',
						description:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage Individual preferences',
						// closeIconLabel: 'Reject all and close modal',
						footer: `
							<a href="#path-to-impressum.html" target="_blank">Impressum</a>
							<a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
					`
					},
					preferencesModal: {
						title: 'Manage cookie preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Accept current selection',
						closeIconLabel: 'Close modal',
						serviceCounterLabel: 'Service|Services',
						sections: [
							{
								title: 'Your Privacy Choices',
								description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`
							},
							{
								title: 'Strictly Necessary',
								description:
									'These cookies are essential for the proper functioning of the website and cannot be disabled.',

								//this field will generate a toggle linked to the 'necessary' category
								linkedCategory: 'necessary'
							},
							{
								title: 'Performance and Analytics',
								description:
									'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
								linkedCategory: 'analytics',
								cookieTable: {
									caption: 'Cookie table',
									headers: {
										name: 'Cookie',
										domain: 'Domain',
										desc: 'Description'
									},
									body: [
										{
											name: '_ga',
											domain: 'yourdomain.com',
											desc: 'Description 1'
										},
										{
											name: '_gid',
											domain: 'yourdomain.com',
											desc: 'Description 2'
										}
									]
								}
							},
							{
								title: 'Targeting and Advertising',
								description:
									'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
								linkedCategory: 'ads'
							},
							{
								title: 'More information',
								description:
									'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
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

<style>
	:global(#cc-main) {
		--cc-bg: hsl(var(--muted));
		--cc-primary-color: hsl(var(--foreground));
		--cc-secondary-color: hsl(var(--foreground));

		--cc-btn-primary-bg: hsl(var(--background));
		--cc-btn-primary-color: hsl(var(--foreground));
		--cc-btn-primary-border-color: var(--cc-btn-primary-bg);
		--cc-btn-primary-hover-bg: hsl(var(--secondary));
		--cc-btn-primary-hover-color: hsl(var(--accent-foreground));
		--cc-btn-primary-hover-border-color: var(--cc-btn-primary-hover-bg);

		--cc-btn-secondary-bg: hsl(var(--muted));
		--cc-btn-secondary-color: var(--cc-primary-color);
		--cc-btn-secondary-border-color: hsl(var(--secondary));
		--cc-btn-secondary-hover-bg: hsl(var(--secondary));
		--cc-btn-secondary-hover-color: hsl(var(--foreground));
		--cc-btn-secondary-hover-border-color: var(--cc-btn-secondary-hover-bg);

		--cc-separator-border-color: hsl(var(--background));

		--cc-toggle-on-bg: hsl(var(--primary));
		--cc-toggle-off-bg: hsl(var(--secondary));
		--cc-toggle-on-knob-bg: var(--cc-btn-primary-color);
		--cc-toggle-off-knob-bg: var(--cc-btn-primary-color);

		--cc-toggle-enabled-icon-color: var(--cc-btn-primary-color);
		/*  yes (v tick) */
		--cc-toggle-disabled-icon-color: var(--cc-btn-primary-color);
		/*  no (x tick) */

		--cc-toggle-readonly-bg: hsl(var(--background));
		--cc-toggle-readonly-knob-bg: hsl(var(--secondary));
		--cc-toggle-readonly-knob-icon-color: var(--cc-toggle-readonly-bg);

		--cc-section-category-border: hsl(var(--background));

		--cc-cookie-category-block-bg: hsl(var(--background));
		--cc-cookie-category-block-border: hsl(var(--muted));
		--cc-cookie-category-block-hover-bg: hsl(var(--background));
		--cc-cookie-category-block-hover-border: transparent;
		--cc-cookie-category-expanded-block-bg: hsl(var(--background));
		--cc-cookie-category-expanded-block-hover-bg: var(--cc-toggle-readonly-bg);

		--cc-overlay-bg: rgba(0, 0, 0, 0.65);
		--cc-webkit-scrollbar-bg: var(--cc-section-category-border);
		--cc-webkit-scrollbar-hover-bg: var(--cc-btn-primary-hover-bg);

		--cc-footer-bg: hsl(var(--background));
		--cc-footer-color: var(--cc-secondary-color);
		--cc-footer-border-color: hsl(var(--background));
	}
</style>
