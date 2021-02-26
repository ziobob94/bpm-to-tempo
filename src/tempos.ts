
export const convertFunction = (bpm : number, time? : number) => {
    let result
    if (bpm > 0) {
        const formula = 60000 / bpm;

        if (time) {
            result = (formula * time);
        }

        else result = formula;

        return result;
    }
    else return 0;

}

export const dotMultiplier = (3/2);
export const tripletMultiplier = (2/3);

export const NormalTempo = [
    {
        name : "32",
        multiply: 32,
    },
    {
        name : "16",
        multiply: 16,
    },
    {
        name : "8",
        multiply: 8,
    },
    {
        name : "4",
        multiply: 4,
    },
    {
        name : "2",
        multiply: 2,
    },
    {
        name : "1",
        multiply: 1,
    },
    {
        name : "1/2",
        multiply: (1/2),
    },
    {
        name : "1/4",
        multiply: (1/4),
    },
    {
        name : "1/8",
        multiply: (1/8),
    },
    {
        name : "1/16",
        multiply: (1/16),
    },
    {
        name : "1/32",
        multiply: (1/32),
    },
    {
        name : "1/64",
        multiply: (1/64),
    },
    {
        name : "1/128",
        multiply: (1/128),
    },
    {
        name : "1/256",
        multiply: (1/256),
    }
];
