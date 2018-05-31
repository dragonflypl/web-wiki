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

### HTTP Strict transport security: (strict-transport-security) & preloading

This is the header that tells the browser that all insecure traffice should be redirected with internal browser redirect (307 status code) to https scheme.

When used along with: <https://hstspreload.org> it makes it completely secure. All insecure requests will be automatically redirected to https.

### Mixed content

If page is served via HTTPS, then all its content must also be served via https (images/iframes etc).

### Content-Security-Policy (header or metatag)

It drives browser's behavour when there's mixed content e.g.

- block-all-mixed-conent will block all unsecure content (passive like images and active like scripts)
- upgrade-insecure-requests will automatically change a scheme to https for all insecure requests (lazy approach). Keep in mind that only 50% of browsers market support this.

E.g. `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">.`

### Cookies

Make cookies secure: any secure cookie won't be sent over unsecure connection.

### Overcoming barriers

Use Let's Encrypt or Cloudflare to get certificate for your site.

### Other

- HTTP 2.0 is only available via TLS
- Brotli compression is available only via TLS

## Resources

- <https://www.ssllabs.com/> - check how good your HTTPS is
- <http://www.httpvshttps.com/> - compare speed of HTTP vs HTTPS
- <https://app.pluralsight.com/library/courses/https-every-developer-must-know/table-of-contents>