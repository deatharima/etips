@php
    use App\Services\QrCodeService;

    $url = route('public.branch', $record->qr_token);
@endphp

<div class="flex flex-col items-center gap-6">

    <div class="rounded-xl border bg-white p-6 shadow-sm">
        {!! QrCodeService::make($url) !!}
    </div>

    <div class="text-center">

        <p class="font-semibold">
            {{ $record->venue->name }}
        </p>

        <p class="text-gray-500">
            {{ $record->name }}
        </p>

    </div>

    <x-filament::button
        color="primary"
        icon="heroicon-o-clipboard-document"
        x-on:click="
            navigator.clipboard.writeText('{{ $url }}')
        "
    >
        Копировать ссылку
    </x-filament::button>

</div>
