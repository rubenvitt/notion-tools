export interface SunriseDto {
    location: {
        height: string;
        latitude: string;
        longitude: string;
        time: TimeEntry[];
    };
    meta: {
        licenseurl: string;
    };
}

interface TimeEntry {
    date: string;
    high_moon?: MoonEntry;
    low_moon?: MoonEntry;
    moonphase?: MoonPhaseEntry;
    moonposition?: MoonPositionEntry;
    moonrise?: MoonRiseSetEntry;
    moonset?: MoonRiseSetEntry;
    moonshadow?: MoonShadowEntry;
    solarmidnight?: SolarEntry;
    solarnoon?: SolarEntry;
    sunrise?: SolarEntry;
    sunset?: SolarEntry;
}

interface MoonEntry {
    desc: string;
    elevation: string;
    time: string;
}

interface MoonPhaseEntry {
    desc: string;
    time: string;
    value: string;
}

interface MoonPositionEntry {
    azimuth: string;
    desc: string;
    elevation: string;
    phase: string;
    range: string;
    time: string;
}

interface MoonRiseSetEntry {
    desc: string;
    time: string;
}

interface MoonShadowEntry {
    azimuth: string;
    desc: string;
    elevation: string;
    time: string;
}

interface SolarEntry {
    desc: string;
    elevation: string;
    time: string;
}