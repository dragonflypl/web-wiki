## HTTPS

Https provides this attribues:

- confidentiality: traffic cannot be spoffed (like with firesheep addon) and e.g. content cannot be stolen (like cookies, login / password)
- integrity: content cannot be intercepted and tampered with (e.g. ManInTheMiddle attact cannot insert malicious or any code to the transfered content)
- authenticity: you're given a certificate from the server that you're talking to. So attacks like DNS poisining, Phising, malicious host file entries are not possible.

### Certificate Authority (CA)

CA issues a certificate to a holder of a domain.

### SSL & TLS (Transport Layer Security)

TLS is new SSL (however term is used interchangebly).

HTTPS is implemented using TLS and Browser & Server perform a TLS handshake before secure communication starts (on port 443)

### Certs for development

For development, use a selfsigned certificate (really easy with powershell)

### Debugging HTTPS traffic with Fiddler

In order to debug HTTPS traffic, Fiddler performs a man in the middle attack (it registers inself as CA ad issues a cretificate that is used when browser is talking to the Fiddler)

So by doing this , we compromised to trust invalid CA (Fiddler).

### badssl

Badssl site demonstrates how client (browser) behaves and dealing with different certificates.

## Securing the app

### Permanent redirect

One solution is to permanently redirect to https scheme. However first request is insecure so ManInTheMiddle is possible here.

### SRI - Subresource integrity

Add `integrity` attribute to script or other resource that support it.

If hash of the content changes, then browser will block its execution.

Bottom line, this feature say: unless scripts looks exactly like the one that was hashed, then don't run it.

This works only in scenarios where content is static (like particular version jQuery etc.). For dynamic services like Disqus etc. this won't work as service script might change.

Unfortunately browser support has gaps.

### HTTP Strict transport security: (strict-transport-security) & preloading

This is the header that tells the browser that all insecure traffic should be redirected with internal browser redirect (307 status code) to https scheme.

When used along with: <https://hstspreload.org> it makes it completely secure. All insecure requests will be automatically redirected to https.

As a result, mixed content and upgrading unsecure content are no longer an issues. All insecure requests will be get 307 (internal redirect)

### Mixed content

If page is served via HTTPS, then all its content must also be served via https (images/iframes etc).

### XSS Auditor with X-Xss-Protection

Most browsers have an auditor that could recognize XSS attacks.

It can be configured via X-Xss-Protection header.

### Content-Security-Policy (header or metatag)

This is a way of telling the browser about the trusted domains that can serve content for your site.

I.e. CSP for javascript can tell that when my page loads, it can fetch scripts only from self (my site) & google analytics & some CDN. If for whatever reason site is trying to pull javascript from other sources, then browser will block it.

CSP can be specified for different kinds of content.

CSP can be implemented via response header of meta tag.

CSP also enables Report URI that will send error messages (this works natively only with response headers, unless you use workround <https://scotthelme.co.uk/launching-report-uri-js/>)

It also drives browser's behavour when there's mixed content e.g.

- block-all-mixed-conent will block all unsecure content (passive like images and active like scripts)
- upgrade-insecure-requests will automatically change a scheme to https for all insecure requests (lazy approach). Keep in mind that only 50% of browsers market support this.

E.g. `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">.`

### Content-Security-Polity-Report-Only

This is a header/metatag that enable reporting of violations.

### Cookies

Make cookies secure: any secure cookie won't be sent over unsecure connection.

### CDN

Use Cloudflare CDN.

### HPKP - HTTP public key pinning (`public-key-pins` header or `public-key-pins-report-only` version)

Public key pinning - is a way to tell the browser that no only a site must have a valid certificate, but it must have a certificate with a given public key.

As a result, if CA gets compromised, and attacker performs MIDM (Man in the middle) attack that would serve fraudulent certificate, then browser will spot this and attact will be stopped.

However... HPKP can be dangerous as it can lock your site it used badly (e.g. you changed your certificate and browser still have old public keys pinned). Instead, use `CAA`.

### CAA

This is a DNS mechanism for specifying a list of supported CA for your web site.
CAA is a DNS entry. It does the same thing as HPKP, however it is safer as you cannot screw it up (you cannot lock you site).

### X-Frame-Options

Specifies if you site can be framed or not (protects against clickjacking attacks).

It can be implemented as header or `frame-ancestors` directive of CSP.

### Overcoming barriers

Use Let's Encrypt or Cloudflare to get certificate for your site.

### Other

- HTTP 2.0 is only available via TLS
- Brotli compression is available only via TLS

## Cloudflare

With cloudflare you get HTTPS / HSTS for free.

Also it has firewall.

### Checking if it works

- <chrome://net-internals/#dns> - clear browser's DNS cache
- nslookup mawo.olkusz.pl - check how your machine sees DNS record
- <https://www.whatsmydns.net> - check how DNS records are propagated

## JavaScript security

### CSRF <https://app.pluralsight.com/library/courses/cross-site-forgery-request-web-app>

Ways of defence:

- CRSF token
- Custom header like X-Requested-With with CORS restrictions: allow requests only from the same domain (be sure to allow only requests)

Reads:

- <https://security.stackexchange.com/questions/23371/csrf-protection-with-custom-headers-and-without-validating-token>
- <https://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header>
- <https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2017/september/common-csrf-prevention-misconceptions/> - this proves that tokens are most secure

### Cache API

Only available on HTTPS (only in secure context e.g. if there's a mixed content, then it does not work).

### Tokens and persistence

Cookie vs SessionStorage vs LocalStorage: each has downside that it is (must be) accessible via JavaScript (cos you need to call API with AJAX anyway). However only cookies are sent back & forth to the server so they are a bit less secure.

### CORS and Access-Control-Allow-\* and Access-Control-Request-\*

For CORS request that are considered notsafe, preflight is done:

Request:

```
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

Response:

```
Access-Control-Allow-Origin: http://foo.example
Access-Control-Allow-Methods: POST, GET
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
```

For handling with authentication & cookies, read about `Access-Control-Allow-Credentials`. Everything is here <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>.

## OWASP 2017 TOP 10

### 1. Injection

Less and less SQL / JS Injections etc. But way more NoSQL injections.

### 2. Broken authentication

- People use bad passwords that have been pwned
- Site authors allow automated attacks like credential stuffing:
  - Make it impossible with recaptcha
  - Don't allow pwned passwords: <https://haveibeenpwned.com/Passwords>

### 3. Sensitive data exposure

### 4. XML External Entities

Related to XML parsers. You can use malicious XML to exploit servers.

### 5. Broken Access Control

E.g. play aroung with url params / body and act as somebody else.

### 6. Security misconfiguration

Like bad TLS / SSL cyphers, not secure web.config, bad error handling etc.

### 7. XSS

Well known, fortunately frameworks like React / Angular make it harder to create XSS holes.

### 8. Insecure deserialization

This is kind of attack where data send over the wire (like JSON) is tampered with, and it causes issues when deserialized.

### 9. Using components with known voulnerabilities

Many open source stuff has holes - npm and other package managers are now built with security features.

### 10. Insufficient loggin & monitoring

Attacks are often spotted long after they happened (about 190 days).

Have some audit trails with critical entries (like anti-automation tool like recaptacha was triggered)

## Resources

- <https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project> - Zed is penetration testing tool
- `juice-shop` - web app with OWASP TOP 10
- Burp Suite - tool similar to fiddler
- <https://sonarwhal.com> - performs a complete scan of the site and finds vulnerabilities
- <https://observatory.mozilla.org/> - yet another page that makes security analysis of your site
- <https://dnsspy.io/> and <https://dnsspy.io/labs> - it has a way to validate DNS entries and also check CAA details
- <https://doesmysiteneedhttps.com/> - guide on HTTPS
- <https://securityheaders.com/> - check how good your site is at security headers
- <https://www.ssllabs.com/> - check how good your HTTPS is
- <http://www.httpvshttps.com/> - compare speed of HTTP vs HTTPS
- <https://app.pluralsight.com/library/courses/https-every-developer-must-know/table-of-contents>
- <https://app.pluralsight.com/library/courses/play-by-play-javascript-security/table-of-contents>
- <https://app.pluralsight.com/library/courses/play-by-play-modern-web-security-patterns/table-of-contents>
- <https://app.pluralsight.com/library/courses/play-by-play-https-what-you-need-know-about-today>
- <https://app.pluralsight.com/library/courses/play-by-play-owasp-top-ten-2017>
- <https://www.smashingmagazine.com/2017/04/secure-web-app-http-headers/> useful security headers
