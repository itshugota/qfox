<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class SupportedLanguages extends Enum
{
    const EN = 'en';
    const VI = 'vi';

    public static $types = [self::EN, self::VI];
}
