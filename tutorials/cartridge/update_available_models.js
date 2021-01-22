var temp = {
    AxonHillockModels: {
        LeakyIAF:
            {
                states: { V: -60.},
                params: { threshold: 0., reset_potential: -70., capacitance: 0.5, resting_potential: 0., resistance: 250.0 },
                names: {'V': 'Membrane Potential - Set Initial Value (mV)',
                'threshold': 'Firing Threshold (mV)',
                'reset_potential': 'Reset Potential (mV)',
                'capacitance': 'Capacitance (µF)',
                'resting_potential': 'Resting Potential (mV)',
                'resistance': 'Resistance (KΩ)'}
            },
        HodgkinHuxleyFull:
            {
                states: { V: -70., n: 0., m: 0., h: 0.92 },
                params: { g_K: 36., g_Na: 120., g_L: 0.3, E_K: -77., E_Na: 50., E_L: -54.387, capacitance: 1.0},
                names: {'g_K': 'Maximum Conductance of Potassium Channel (mS/cm^2)',
                'g_Na': 'Maximum Conductance of Sodium Channel (mS/cm^2)',
                'g_L': 'Conductance of Leak Channel (mS/cm^2)',
                'E_K': 'Reversal Potential of Potassian Channel (mV)',
                'E_Na': 'Reversal Potential of Sodium Channel (mV)',
                'E_L': 'Reversal Potential of Leak Channel (mV)',
                'capacitance': 'Capacitance (µF)',
                'V': 'Membrane Potential - Set Initial Value (mV)',
                'n': 'n - Set Initial Value',
                'm': 'm - Set Initial Value',
                'h': 'h - Set Initial Value'}
            },
        ConnorStevensFull:
            {
                states: { V: -70., n: 0., m: 0., h: 1., a: 0., b: 0.},
                params: {g_K: 36., g_Na: 120., g_L: 0.3, E_K: -77., E_Na: 50., E_L: -54.387 },
                names: {
                    'g_K': 'Maximum Conductance of Potassium Channel (mS/cm^2)',
                    'g_Na': 'Maximum Conductance of Sodium Channel (mS/cm^2)',
                    'g_L': 'Conductance of Leak Channel (mS/cm^2)',
                    'V': 'Membrane Potential - Set Initial Value (mV)',
                    'E_K': 'Reversal Potential of Potassium Channel (mV)',
                    'E_Na': 'Reversal Potential of Sodium Channel (mV)',
                    'E_L': 'Reversal Potential of Leak Channel (mV)',
                    'E_A': 'Reversal Potential of A Current Channel (mV)',
                    'n': 'n - Set Initial Value',
                    'm': 'm - Set Initial Value',
                    'h': 'h - Set Initial Value',
                    'A': 'A - Set Initial Value',
                    'B': 'B - Set Initial Value'}
            }
    },
    MembraneModels: {
        MorrisLecar:
        {
            states: { V: -46.080, n: 0.3525 },
            params: { V1: -20.0, V2: 50.0, V3: -40.0, V4: 20.0, phi: 0.001, offset: 0.0, V_L: -40.0, V_Ca: 120.0, V_K: -80.0, g_L: 3.0, g_Ca: 4.0, g_K: 15.0 },
            names: {
                'g_K': 'Maximum Conductance of Potassium Channel (mS/cm^2)',
                'g_L': 'Conductance of Leak Channel (mS/cm^2)',
                'g_Ca': 'Maximum Conductance of Calcium Channel (mS/cm^2)',
                'V': 'Membrane Potential - Set Initial Value (mV)',
                'V1': 'Parameter V1 (mV)',
                'V2': 'Parameter V2 (mV)',
                'V3': 'Parameter V3 (mV)',
                'V4': 'Parameter V4 (mV)',
                'phi': 'Inverse of time constanct phi',
                'n': 'n - Set Initial Value',
                'offset': 'offset',
                'V_L': 'Reversal Potential of Leak Channel (mV)',
                'V_K': 'Reversal Potential of Potassium Channel (mV)',
                'V_Ca': 'Reversal Potential of Calcium Channel (mV)',
            }
        },
        PhotoreceptorModel:
        {
            states: {V: -82.0},
            params: {num_microvilli: 30000,
            },
            names: {'V': 'Membrane Potential - Set Initial Value (mV)',
                    'num_microvilli': 'Number of microvilli per photoreceptor'
                }
        }
    },
    SynapseModels: {
        AlphaSynapse2: {
            states: {g: 0.0},
            params: { gmax: 100., ar: 0.19, ad: 0.1, reverse: 0.},
            names: {'gmax': 'Maximum Conductance (mS/cm^2)',
            'ar': 'Rise Rate of Conductance (ms^-1)',
            'ad': 'Decay Rate of Conductance (ms^-1)',
            'g': 'Conductance (mS/cm^2)',
            'reverse': 'Reversal Potential of the Synapse (mV)'}
        },
        SigmoidSynapse: {
            states: {g: 0.0},
            params: {gmax: 100., reverse: 0., threshold: -50., scale: 1., slope: 0.02},
            names: {
                'g': 'Maximum Conductance (mS/cm^2)',
                'gmax': 'Maximum Conductance (mS/cm^2)',
                'threshold': 'Presynaptic Membrane Potential to Reach 50% of Maximum Conductance (mV)',
                'slope': 'Slope at 50% of Maximum Conductance',
                'scale': 'scaling factor',
                'reverse': 'Reversal Potential of the Synapse (mV)'
            }
        }

    },
}

for (var modelFamily in temp) {
    for (var model in temp[modelFamily]) {
        window._NKModels[modelFamily][model] = temp[modelFamily][model];
        var ind = window._NKModelNames.indexOf(model);
        if(ind < 0){
            window._NKModelNames.push(model);
        }
        console.log(model);
    }
}
