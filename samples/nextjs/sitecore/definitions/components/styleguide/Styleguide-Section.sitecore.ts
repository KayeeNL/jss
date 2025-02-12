import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Styleguide-Section component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function StyleguideSection(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Styleguide-Section',
    templateName: 'JssNextWeb-Styleguide-Section',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: 'heading', type: CommonFieldTypes.SingleLineText }],
    placeholders: ['jss-styleguide-section'],
  });
}
