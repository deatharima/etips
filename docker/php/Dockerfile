FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    bash \
    git \
    curl \
    unzip \
    icu-dev \
    libzip-dev \
    postgresql-dev

RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/