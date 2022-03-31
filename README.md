##  Next.js + WPGraphql + Authentication + Registration + Recoil + Apollo Client

<br>

The project is a Next.js application that shows how to register and authenticate users using WordPress native cookies.

<br>

## Requiriments

Wordpress instance with **WP GraphQL** and **WPGraphQL CORS** plugin enabled.

[WPGraphql](https://wordpress.org/plugins/wp-graphql/)<br>
[WPGraphql Cors](https://github.com/funkhaus/wp-graphql-cors/releases/tag/2.0)

<br>

## Configure WPGraphQL Cors settings

<br>

<img src="https://res.cloudinary.com/e0c089c0/image/upload/v1648755345/GITHUB/wpgraphql-cors-settings.png" alt="WPGraphQL Cors Settings">

<br>

## Wordpress Settings

Enable option `Anyone can register` in Settings/General

<br>

## Setup Client

Add your wordpress instance url in `.env.local` <br>
Run: `yarn` <br>
Run: `yarn dev` <br>

<br>

## Create local domain certificate (optional):

<br>

<code>
openssl req -x509 -out localhost.crt -keyout localhost.key \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=localhost' -extensions EXT -config <( \
printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
</code>

<br>

## Start project with https

Run:	`node server`
