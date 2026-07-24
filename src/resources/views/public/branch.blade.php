<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $branch->venue->name }}</title>
</head>
<body>

<h1>{{ $branch->venue->name }}</h1>

<h2>{{ $branch->name }}</h2>

<p>{{ $branch->address }}</p>

<hr>

<p>QR Token:</p>

<code>{{ $branch->qr_token }}</code>

</body>
</html>
