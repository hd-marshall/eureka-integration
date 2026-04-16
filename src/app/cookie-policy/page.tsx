// app/cookie-policy/page.tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Eureka Integration',
  description: 'Cookie Policy for Eureka Integration - Learn how we use cookies and related technologies on our website.',
};

// Cookie Policy configuration - company info
const businessInfo = {
  name: "Eureka Integration",
  website: "eurekaintegration.com"
};

export default function CookiePolicy() {
  return (
    <div className="flex justify-center py-12 px-4 pt-40">
      <div className="w-full md:w-3/5 lg:w-3/5 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Cookie Policy</h1>
        
        <p className="mb-4">
          {businessInfo.name} (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) uses cookies, tracking pixels and related
          technologies on {businessInfo.website} (the &quot;Service&quot;). By using the Service, you
          consent to the use of these cookies, tracking pixels and related technologies.
        </p>
        
        <p className="mb-4">
          Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may
          partner with may use cookies on the Service, your choices regarding cookies and further
          information about cookies.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies</h2>
        
        <p className="mb-4">
          Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is
          stored in your web browser and allows the Service or a third-party to recognize you and make
          your next visit easier and the Service more useful to you.
        </p>
        
        <p className="mb-4">
          Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How {businessInfo.name} uses cookies</h2>
        
        <p className="mb-4">
          When you use and access the Service, we may place a number of cookie files in your web
          browser.
        </p>
        
        <p className="mb-4">
          We may use cookies, pixels and related technologies for the following purposes:
        </p>
        
        <ol className="list-decimal pl-8 mb-4">
          <li className="mb-2">to enable certain functions of the Service</li>
          <li className="mb-2">to provide analytics and track how you use the site including gathering data via the use
            of Google Analytics. This includes the gathering of data for Google Analytics
            Demographics and Interest Reporting.</li>
          <li className="mb-2">to store your preferences</li>
          <li className="mb-2">to enable advertisements delivery including on Google, Meta (incl. Facebook and
            Instagram) and any of their partnering networks (including the Google Display Network).
            This includes ads using Google remarketing, search, display or video ads &
            Facebook/Instagram ads & re-targeting, as well as any behavioral/interest-based
            advertising. It also includes the use of Google Analytics data, including the Google
            Analytics Demographics and Interest reporting, for the purposes of displaying ads.</li>
        </ol>
        
        <p className="mb-4">
          We may use both session and persistent cookies on the Service and we use different types of
          cookies to run the Service.
        </p>
        
        <p className="mb-4">
          We may use essential cookies to authenticate users and prevent fraudulent use of user
          accounts.
        </p>
        
        <p className="mb-4">
          For more information on how Google Analytics collects and processes data please view:
          <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 hover:underline ml-1">
            https://policies.google.com/technologies/partner-sites
          </a>.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-party cookies</h2>
        
        <p className="mb-4">
          In addition to our own cookies, we may also use various third-parties cookies to report usage
          statistics of the Service, deliver advertisements on and through the Service, and so on.
        </p>
        
        <p className="mb-4">
          Third party vendors, including Google and Meta (incl.Facebook and Instagram), may use these
          third party cookies, web beacons and other storage technologies to collect or receive
          information from the Service (and elsewhere on the Internet) and use that data to provide
          measurement services and to serve ads, including ads based on past visits to the Service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">What are your choices regarding cookies</h2>
        
        <p className="mb-4">
          If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please
          visit the help pages of your web browser.
        </p>
        
        <p className="mb-4">
          Please note, however, that if you delete cookies or refuse to accept them, you might not be able
          to use all of the features we offer, you may not be able to store your preferences, and some of
          our pages might not display properly.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Where can you find more information about cookies</h2>
        
        <p className="mb-4">
          You can learn more about cookies and the following third-party websites:
        </p>
        
        <ul className="list-disc pl-8 mb-4">
          <li className="mb-2">
            AllAboutCookies: <a href="http://www.allaboutcookies.org/" className="text-blue-600 hover:underline">http://www.allaboutcookies.org/</a>
          </li>
          <li className="mb-2">
            Network Advertising Initiative: <a href="https://optout.networkadvertising.org/" className="text-blue-600 hover:underline">https://optout.networkadvertising.org/</a>
          </li>
          <li className="mb-2">
            <a href="https://optout.aboutads.info/" className="text-blue-600 hover:underline">https://optout.aboutads.info/</a>
          </li>
          <li className="mb-2">
            You can opt out of Google&apos;s use of cookies by visiting Google&apos;s Ads Settings page:
            <a href="https://adssettings.google.com" className="text-blue-600 hover:underline ml-1">https://adssettings.google.com</a>.
          </li>
          <li className="mb-2">
            You can also use a Google Analytics Opt-out Browser Add-on to prevent data from being
            used by Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout/" className="text-blue-600 hover:underline">https://tools.google.com/dlpage/gaoptout/</a>
          </li>
          <li className="mb-2">
            You can also control the use of device identifiers by using your device settings:
            <a href="https://support.google.com/ads/answer/1660762#mob" className="text-blue-600 hover:underline ml-1">https://support.google.com/ads/answer/1660762#mob</a>
          </li>
        </ul>
      </div>
    </div>
  );
}