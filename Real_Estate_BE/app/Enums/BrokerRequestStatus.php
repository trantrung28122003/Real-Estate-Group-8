<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class BrokerRequestStatus extends Enum
{
    const APPLIED = 0;
    const ACCEPTED = 1;
    const REJECTED = 2;
}
