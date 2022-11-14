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



function modelUpdate(NLPInput) {
    /**
     * Updates the workspace according to server commands.
     *
     * @example modelUpdate({command: "show", elements: ["R1","R2"]});
     * @example modelUpdate({command: "add", elements: ["L2"]});
     *
     * @param {dict} NLPInput A dictionary with two keys, command and elements. Command is one of "show", "add" and "remove"; elements is an array of strings.
     */
    console.log('modelUpdate Input:', NLPInput);
    if (NLPInput.command == "show") {
        neuList.forEach(function (element) {
            try {
                element = element
                var neu = svgObj.select("#" + element);
                if (neu.attr("visible") == "true") {
                    toggleByID(element, false);
                };
            }
            catch (err) { };
        });
        NLPInput.elements.forEach(function (element) {
            element = element
            toggleByID(element, false);
        });
    }
    if (NLPInput.command == "remove") {
        NLPInput.elements.forEach(function (element) {
            try {
                element = element
                var neu = svgObj.select("#" + element);
                if (neu.attr("visible") == "true") {
                    toggleByID(element, false);
                };
            }
            catch (err) { };
        });
    }
    if (NLPInput.command == "add") {
        NLPInput.elements.forEach(function (element) {
            try {
                element = element
                var neu = svgObj.select("#" + element);
                if (neu.attr("visible") != "true") {
                    toggleByID(element, false);
                };
            }
            catch (err) { };
        });
    }
}

window.refreshDisabled = function(disabled_list) {
    let disabled_list_copy = disabled_list.slice();
    for (var i = 0; i < neuList.length; i++) {
        var element = neuList[i];
        var neu = svgObj.select("#" + element);
        if (neu.attr("visible") != "true") {
            toggleByID(element, false);
        };
    }
    disabled_list_copy.forEach(function (element) {
        console.log('Toggling',element);
        toggleByID(element, false);
    });
}

window.renewCircuit = function () {
    if (window.IOName in window.fbl.experimentConfig) {
        if ('disabled' in window.fbl.experimentConfig[window.IOName]) {
            console.log('Found config: ', window.fbl.experimentConfig[IOName]);
            for (var key in window.fbl.experimentConfig['cartridge']) {
                console.log('Checking for ', key);
                var keyName = key;
                $(window.neuron_selector).each(function (index, value) {
                    var configName = $(value).attr('id');
                    if (keyName == configName) {
                        console.log('Found previous setting for and updated ' + configName + '.');
                        window.simModels[$(value).attr('simID')] = window.fbl.experimentConfig['cartridge'][keyName];
                        window.simNames[index] = window.fbl.experimentConfig['cartridge'][keyName]['params']['name'];
                    }
                });
            }
            window.fbl.experimentConfig[IOName].disabled = [...new Set(window.fbl.experimentConfig[IOName].disabled)];
            console.log('Disabled:', window.fbl.experimentConfig[IOName].disabled);
            window.refreshDisabled(window.fbl.experimentConfig[IOName].disabled);
        }
        else {
        }
    }
    else {
        console.log('No config found.');
    }
    window.updateCircuit();
};

window.sendExperimentConfig = function () {
    var experimentConfig = JSON.stringify(window._neuGFX.mods.FlyBrainLab.experimentConfig);
    window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'loadExperimentConfig', config: experimentConfig });
}

window.IOName = 'cartridge';
if (window.IOName in window.fbl.experimentConfig) {
}
else {
    window.fbl.experimentConfig['cartridge'] = {};
}

window.fbl.experimentConfig['cartridge'].updated = [];
window.fbl.experimentConfig['cartridge'].disabled = [];

function remove_all_occurances(list, val) {
    var i = 0;
    while (i < list.length) {
      if (list[i] === val) {
        list.splice(i, 1);
      } else {
        i = i + 1;
      }
    }
    return list;
  }

window.updateCircuit = function () {
    var lpu_name = 'cartridge';
    if (lpu_name in window.fbl.experimentConfig) {
        if (!('disabled' in window.fbl.experimentConfig[lpu_name])) {
            window.fbl.experimentConfig[lpu_name].disabled = [];
        }
        if (!('updated' in window.fbl.experimentConfig[lpu_name])) {
            window.fbl.experimentConfig[lpu_name].updated = [];
        }
    }
    else {
        window.fbl.experimentConfig[lpu_name] = {};
        window.fbl.experimentConfig[lpu_name].disabled = [];
        window.fbl.experimentConfig[lpu_name].updated = [];
    }

    neuList.forEach(function (element) {
        // element = element.replace('a','alpha');
        var neu = svgObj.select("#" + element);
        console.log(neu.attr('visible'))
        if (neu.attr("visible") == "false") {
            if (!window.fbl.experimentConfig[lpu_name].disabled.includes(element)) {
                window.fbl.experimentConfig[lpu_name].disabled.push(element);}
        }
        else {
            window.fbl.experimentConfig[lpu_name].disabled = remove_all_occurances(window.fbl.experimentConfig[lpu_name].disabled, element);
        }
    });
    window.sendExperimentConfig();
};

/*
 * Create neuron list
 */
var svgObj = d3.select(document.querySelector('svg'));
var neuList = [
    'C2', 'C3', 'L1', 'L2', 'L3', 'L4', 'L5', 'R1', 'R2', 'R3', 'R4',
    'R5', 'R6', 'T1', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6'];

//var neuList = ['C2','C3'];
/*
 * Create neuron json
 */
var neuJson = {};
for (var i = 0; i < neuList.length; i++) {
    var id = neuList[i];
    if (id[0] == 'a')
        id = 'a' + id[5];
    neuJson[neuList[i]] = {
        'filename': '/lpu/lam_r/swc/' + id + '.swc',
        'label': neuList[i]
    };
}

var cartridge_data_set = false;

$(".vis").dblclick(function () {
    if ($(this).hasClass("vis-sm")) {
        $(".vis-hf-r").toggleClass("vis-sm vis-hf-r");
        $(".vis-lg").toggleClass("vis-sm vis-lg");
        $(this).toggleClass("vis-sm vis-lg");
    }
});




//var toolTip = new ToolTip("tool-tip");
svgObj.on('dblclick', function () {
    if ($("#vis-svg").hasClass("vis-svg-sm")) {
        $("#vis-svg").toggleClass("vis-svg-sm vis-svg-lg");
        $("#vis-3d").toggleClass('vis-3d-sm vis-3d-lg');
        //ffboMesh.onWindowResize();
    }
});
//var svg = svgObj.selectAll(".neuron-block");
function toggleByID(a, echo = true) {
    var neu = svgObj.select("#" + a);
    var hideOrShow = "remove";
    $("#btn-" + a).toggleClass("selected unselected");
    if (neu.attr("visible") == "true") {
        console.log('make_invisible')
        console.log(neu)
        neu.attr("visible", "false");
        neu.style("opacity", "0.3");
        $("#btn-" + a).html('&EmptySmallSquare; ' + a);
        hideOrShow = "remove";
        window.fbl.experimentConfig['lastAction'] = 'deactivated';
        window.fbl.experimentConfig['lastObject'] = 'neuron';
        window.fbl.experimentConfig['lastLabel'] = a;
    } else {
        console.log('make_visible')
        console.log(neu)
        neu.attr("visible", "true");
        neu.style("opacity", "1.0");
        $("#btn-" + a).html('&FilledSmallSquare; ' + a)
        hideOrShow = "add";
        window.fbl.experimentConfig['lastAction'] = 'activated';
        window.fbl.experimentConfig['lastObject'] = 'neuron';
        window.fbl.experimentConfig['lastLabel'] = a;
    }

    console.log(neu.attr('visible'))
    svgObj.selectAll("." + a + "-dependent")
        .style("opacity", function () {

            var count = parseInt((d3.select(this).attr("count")), 10);

            if (neu.attr("visible") == "false") {
                count += 1;
                d3.select(this).attr("count", count);
                return "0.0";
            } else {
                count -= 1;
                d3.select(this).attr("count", count);
                if (count == 0) {
                    return "1.0";
                } else {
                    return "0.0";
                }
            }
        });

    console.log(neu.attr('visible'))

    if (echo == true) {
        var b = a;
        b = b.replace("alpha", "a");
        if (b.indexOf('R') > -1)
            window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', query: hideOrShow + " $" + b + "$" });
        else
            window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', query: hideOrShow + " $" + b + "$" });
    }
    console.log(neu.attr('visible'))
    window.updateCircuit();
    console.log(neu.attr('visible'))
}
for (var i = 0; i < neuList.length; i++) {
    var id = neuList[i];
    $("#single-neu").append("<li><a id='" + "btn" + "-" + id + "'role='button' class='btn-neu-single selected'>&FilledSmallSquare; " + id + "</a></li>");
}
$(".btn-neu-single").click(function () {
    var id = $(this).attr("id").substring(4);
    toggleByID(id);
});
/*
 * create neuron 3D mesh
ffboMesh = new FFBOMesh3D('vis-3d', {'ffbo_json':neuJson, 'colororder': 'order', 'showAfterLoadAll': true});
ffboMesh.dispatch['click'] = toggleByID;
 */
//ffboMesh = new FFBOMesh3D('vis-3d', neuJson, toggleByID);
//ffboMesh.animate();
//new ResizeSensor($("#vis-3d"), function() {
//ffboMesh.onWindowResize();
//});

window.onAddAllClick = function () {
    svgObj.selectAll(".syn-stroke")
        .style("opacity", "1.0")
        .attr("count", 0);
    //ffboMesh.showAll();
    //window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', query: "remove neurons" });
    // window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', tag: "homecartridge" });
    window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', query: "add $$" });
    //window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPaddByUname', uname: "TH-F-200073" });
    //neuList.forEach(function(el) {el = el.replace("alpha", "a"); window._neuGFX.mods.FlyBrainLab.sendMessage({ messageType: 'NLPquery', query: "add " + el + " in column home" });});

    svgObj.selectAll(".neuron-block")
        .attr("visible", "true")
        .style("opacity", "1.0")
        .each(function () {
        })
    $(".btn-neu-single").each(function () {
        var id = $(this).attr("id").substring(4);
        $(this).removeClass("unselected");
        $(this).addClass("selected");
        $(this).html('&FilledSmallSquare; ' + id)
    });
}

window.onRemoveAllClick = function () { }
//     svgObj.selectAll(".syn-stroke")
//         .style("opacity", "0.0")
//         .attr("count", function () { return d3.select(this).attr("max-count") });
//     svgObj.selectAll(".neuron-block")
//         .attr("visible", "false")
//         .style("opacity", "0.3")
//         .each(function () {
//         })
//     $(".btn-neu-single").each(function () {
//         var id = $(this).attr("id").substring(4);
//         $(this).removeClass("selected");
//         $(this).addClass("unselected");
//         $(this).html('&EmptySmallSquare; ' + id)
//         svgObj.selectAll(".neuron-block")
//     });
//     //ffboMesh.hideAll();
// }
svgObj.selectAll(".neuron-block")
    .style("cursor", "pointer")
    .style("opacity", "1.0")
    .attr("visible", "true")
    .each(function () {
        var a = d3.select(this).attr("id");
        d3.select(this).attr("tooltip-data", a + " :: Neuron");
        svgObj.selectAll("." + a + "-dependent")
            .style("opacity", function () {

                if (d3.select(this).attr("count") == null)
                    d3.select(this).attr("count", 0);
                if (d3.select(this).attr("max-count") == null)
                    d3.select(this).attr("max-count", 0);
                var count = parseInt((d3.select(this).attr("max-count")), 10);
                count += 1;
                d3.select(this).attr("max-count", count);
                d3.select(this).classed("syn-stroke", true);
            })
    })
    .on("mouseover", function () {
        if (d3.select(this).attr("visible") == "true") {
            d3.select(this).style("opacity", 0.5);
        }
        var neuron_id = d3.select(this).attr("id")
        var neuron_label;

        if (cartridge_data_set) {
            if (Object.keys(cartridge_name_to_label).indexOf(neuron_id) > -1) {
                // toolTip.showNeuronInfo(10,250,neuron_id,
                //    cartridge_graph["nodes"][cartridge_name_to_label[neuron_id]["key"]]);
            } else {
                // toolTip.showText(10,250,"Neuron not Available")
            }
        } else {
            //toolTip.showNeuronInfo(10,250,neuron_id,{"N/A": "N/A"})
        };
    })
    .on("mouseout", function () {
        if (d3.select(this).attr("visible") == "true") {
            d3.select(this).style("opacity", 1.0);
        }
        //toolTip.hide();
    })
    .on("click", function () {

        var id = d3.select(this).attr("id");

        toggleByID(id);
    })
//    $("#btn-nk").click( function() {
//        if ($(this).hasClass('closed')) {
//            $(this).text("Close NK");
//            $(".vis-3d-lg").toggleClass('vis-3d-lg vis-sm-2')
//            $(".vis-svg-lg").toggleClass('vis-svg-lg vis-sm-2')
//            $(".vis-3d-sm").toggleClass('vis-3d-sm vis-sm-1')
//            $(".vis-svg-sm").toggleClass('vis-svg-sm vis-sm-1')
//            $("#nk-panel").show();
//        } else {
//            $(this).text("Open NK");
//            $(".vis-sm-1").each( function() {
//                var c = $(this).attr('id') + '-sm';
//                $(this).toggleClass('vis-sm-1 ' + c);
//            })
//            $(".vis-sm-2").each( function() {
//                var c = $(this).attr('id') + '-lg';
//                $(this).toggleClass('vis-sm-2 ' + c);
//            })
//            $("#nk-panel").hide();
//        }
//        $(this).toggleClass('closed opened');
//    });
function getNeuronCount() {
    var activeObj = getActiveObjOnSVG();
    var activeObj_to_label = [];
    for (var key in cartridge_node_dict) {
        var name = cartridge_node_dict[key]["name"];
        if (name.constructor === Array) { // Amacrine Cells
            var count = [];
            // get all the alpha processes that is not active
            for (var i = 0; i < name.length; i++) {
                var alpha_process = name[i];
                if (activeObj.indexOf(alpha_process) < 0) {
                    count.push(alpha_process);
                };
            };
            // if all alpha processes associated with the Amacrine cell
            // is not active, then remove the Amacrine cell by label
            if (count.length != name.length) {
                activeObj_to_label.push(key);
            };
        } else {
            if (activeObj.indexOf(name) >= 0) {
                activeObj_to_label.push(key);
            };
        };
    };
    return activeObj_to_label.length;
}
function getActiveObjOnSVG() {
    var list = [];
    svgObj.selectAll(".neuron-block")
        .each(function () {
            if (d3.select(this).attr("visible") == "true")
                list.push(d3.select(this).attr("id"));
        });
    svgObj.selectAll("path.syn-stroke")
        .each(function () {
            if (parseInt(d3.select(this).attr("count")) == 0) { }
            //    list.push( d3.select(this).attr("id") );
        });

    return list;
}
//nkpanel = new NKPanel("nk-panel");


$("#nk-panel").hide();
$('.vis')
    .mouseenter(function () {
        if ($(this).hasClass("vis-sm") || $(this).hasClass("vis-sm-1"))
            $("#nk-panel").toggleClass('nk-panel-half nk-panel-whole');
    })
    .mouseleave(function () {
        if ($(this).hasClass("vis-sm") || $(this).hasClass("vis-sm-1")) {
            $("#nk-panel").toggleClass('nk-panel-half nk-panel-whole');
        }
    });
$('.vis').dblclick(function () {
    if ($(this).hasClass("vis-hf-l") || $(this).hasClass("vis-sm-1"))
        $(this).toggleClass("vis-sm-1 vis-hf-l")
})


$('.vis').hover(
    function () {
        if ($(this).hasClass("vis-sm"))
            $(".vis-lg").toggleClass("vis-hf-r vis-lg");
    }, function () {
        if ($(this).hasClass("vis-sm"))
            $(".vis-hf-r").toggleClass("vis-hf-r vis-lg");
    });



function onToggleNeuronsClick() {
    mm_menu_right.open();
    $("a[href='#toggle_neurons']")[0].click()
}
function openRightMenu() {
    mm_menu_right.open();
}
function openServerMenu() {
    mm_menu_left.open();
}
// Load Cartridge button clicking event
function onLoadClick() {
    construct_cartridge(client_session, cartridge_num);
}
function onOpenNKClick() {
    console.log("launch NK btn clicked");

    if (cartridge_data_set) {
        if ($(".btn-nk").hasClass('closed')) {
            var activeObj = getActiveObjOnSVG();
            console.log(activeObj);
            start_nk_execution(client_session, activeObj);
            $(".btn-nk").text("Close NK");
        } else {
            $(".btn-nk").text("Open NK");
            $("#vis-svg").toggleClass('vis-sm vis-lg')
            $("#vis-3d").toggleClass('vis-sm-1 vis-sm')
            $("#nk-panel").hide();
            //nkpanel.hidePlayBar();
        }
        $(".btn-nk").toggleClass('closed opened');
        //ffboMesh.loadAnimJson(animJSON);
    } else {
        Notify("Error: Please load cartridge info first by clicking on 'Load Cartridge'", null, null, 'danger')
    };

}

var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();



$("#btn-tutorial-video").click(function () { $("#video-panel").slideDown(500) });
$("#btn-video-close").click(function () {
    $("#video-iframe")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    $("#video-panel").slideUp(500)
});
//function processUser()
//{
//var parameters = location.search.substring(1).split("&");
//
//var temp = parameters[0].split("=");
//l = unescape(temp[1]);
//temp = parameters[1].split("=");
//p = unescape(temp[1]);
//document.getElementById("cartnum").innerHTML = l;
//console.log(p)
//}


window._simulate = function () {
    //window._neuGFX.sendAlert("Starting execution...");
    var cartid = window.customCircuitAttributes.cartridge_num;
    var uids = [];
    var data = [];
    var activeList = getActiveObjOnSVG();
    window.simData['uids'].forEach(function (value, i) {
        var a = value.split("_");
        //console.log(a[a.length - 1]);
        if (a[a.length - 1] == String(cartid)) {
            var uid = window.simData['uids'][i];
            if (activeList.includes(a[1])) {
                data.push(window.simData['data'][i]);
                uids.push(window.simData['uids'][i]);
            }
        }
        //console.log('%d: %s', i, value);
    });
    //console.log(uids);
    window._neuGFX.sendAlert("Results loaded!");
    window._neuGFX.mods.Plotter.addExternalData(data, uids, "Time [s]", "Voltage [mV]");
}

window._neuGFX.mods.FlyBrainLab.addFBLPath("Cartridge", function () { });
console.log('Loading was successful...');
window.onAddAllClick();

window.simulate = function () {
    window._neuGFX.sendAlert("Starting execution...");
    jQuery.getJSON("https://data.flybrainlab.fruitflybrain.org/simresults/lamina_output0.json", function (result) {
        console.log(result);
        window.simData = result;
        //window._neuGFX.mods.Plotter.addExternalData(result['data'], result['uids']);
        jQuery.getJSON("https://data.flybrainlab.fruitflybrain.org/simresults/retina_output0.json", function (result) {
            console.log(result);
            window.simData['data'] = window.simData['data'].concat(result['data']);
            window.simData['uids'] = window.simData['uids'].concat(result['uids']);
            //window._neuGFX.mods.Plotter.addExternalData(result['data'], result['uids']);
            console.log("Test data loaded...")
            window._neuGFX.sendAlert("Execution complete! Loading results...");
            window._simulate();
        });
        console.log("Test data loaded...")
    });
}




window.simModels = {};
window.simNames = {};
window.simIDs = {};
window.simID = 0;
window.neuron_selector = ".neuron-block";
$(neuron_selector).each(function (index, value) {
    $(this).attr('simID', index);
    simModels[index] = _NKModels.DefaultModels.Default;
    simModels[index].params['name'] = "Default";
    simNames[index] = "Default";
    simIDs[index] = this;
});

window.getModelData = function (callback, simModel) {
    if ($('.NeuGFX-overlay').length) {
        var modelData = {};
        // console.log('getModelData call simModel:', simModel);
        console.log('getModelData call simModel data:', window.simModels[simID]);
        $(".modelInput").each(function (index, value) {
            //console.log(this);
            // if (!($(this).attr('entrytype') in modelData))
            // simModels[simID][$(this).attr('entrytype')] = {};
            // modelData[$(this).attr('entrytype')] = {};
            window.simModels[simID][$(this).attr('entrytype')][$(this).attr('name')] = this.value;

        });
        var configName = $(simIDs[simID]).attr('tooltip-data').split(" :: ")[0];
        window.fbl.experimentConfig['cartridge'][configName] = window.simModels[simID];
        modelData['name'] = $('#modelSelect')[0].value;
        $('.container-fullwidth').removeClass("is-blurred");
        callback();
        window.sendExperimentConfig();
    }
}

window.createOverlay = function (simID, simModel) {
    var overlay = document.createElement("div");
    overlay.classList.add("NeuGFX-overlay");
    $('.container-fullwidth')[0].classList.add("is-blurred");
    // Create the three rows
    var row = document.createElement("div");
    row.classList.add("NeuGFX-overlay-row");
    overlay.appendChild(row);
    var leftc = document.createElement("div");
    leftc.classList.add("NeuGFX-overlay-column");
    row.appendChild(leftc);
    var middlec = document.createElement("div");
    middlec.classList.add("NeuGFX-overlay-column");
    row.appendChild(middlec);
    var rightc = document.createElement("div");
    rightc.classList.add("NeuGFX-overlay-column");
    row.appendChild(rightc);
    // Create the Selection List
    var h4 = document.createElement("h4");
    h4.textContent = "Model Library";
    leftc.appendChild(h4);
    var selectList = document.createElement("select");
    selectList.id = "modelSelect";
    $(selectList).css({ 'min-width': '60%' });
    leftc.appendChild(selectList);
    for (var i = 0; i < _NKModelNames.length; i++) {
        var option = document.createElement("option");
        option.value = _NKModelNames[i];
        option.text = _NKModelNames[i];
        selectList.appendChild(option);
    }
    $(selectList).on('change', function () {
        console.log(_NKModels);
        var modelName = $('#modelSelect')[0].value;
        for (var modelFamily in _NKModels) {
            for (var model in _NKModels[modelFamily]) {
                if (model == modelName) {
                    var data = JSON.parse(JSON.stringify(_NKModels[modelFamily][model]));
                    console.log(JSON.parse(JSON.stringify(_NKModels[modelFamily][model])));

                    window.simModels[simID] = {};
                    console.log(window.simModels[simID]);
                    console.log(JSON.parse(JSON.stringify(_NKModels[modelFamily][model])));
                    // window.simModels[simID] = JSON.parse(JSON.stringify(_NKModels[modelFamily][model]));
                    window.simModels[simID] = $.extend({}, JSON.parse(JSON.stringify(_NKModels[modelFamily][model])));
                    let template = JSON.parse(JSON.stringify(_NKModels[modelFamily][model]));
                    console.log('Template:', template);
                    console.log('Model:', window.simModels[simID]);



                    window.simModels[simID].params['name'] = model;
                    console.log(window.simModels[simID]);
                    window.simNames[simID] = model;
                    // simModel = window.simModels[simID];


                    getModelData(function () {
                        $('.NeuGFX-overlay').remove();
                        for (var i in window.simModels[simID]) {
                            // console.log(window.simModels[simID][i]);
                            for (var j in window.simModels[simID][i]) {
                                // console.log(j);
                                if ((!(j in template[i])) && (j != 'name')) {
                                    // console.log(i, j)
                                    delete window.simModels[simID][i][j];
                                }
                            }
                        }
                        createOverlay(simID, window.simModels[simID]);
                    }, window.simModels[simID]);
                    console.log(simIDs[simID]);
                    console.log('Model Name', window.simModels[simID]);

                    var configName = $(simIDs[simID]).attr('tooltip-data').split(" :: ")[0];
                    console.log(configName);
                    window.fbl.experimentConfig['cartridge'][configName] = JSON.parse(JSON.stringify(window.simModels[simID]));



                }
            }
        }
        window.sendExperimentConfig();
    });
    // Create the headers for the overlay
    h4 = document.createElement("h4");
    h4.textContent = "States";
    leftc.appendChild(h4);
    h4 = document.createElement("h4");
    h4.textContent = "Model Parameters";
    middlec.appendChild(h4);
    h4 = document.createElement("h4");
    h4.textContent = "Model Definition";
    rightc.appendChild(h4);
    // Add the states and Parameters
    var data = simModel;
    selectList.value = simNames[simID];
    var modelName = selectList.value;
    window.myModel = {};
    for (var modelFamily in _NKModels) {
        for (var model in _NKModels[modelFamily]) {
            if (model == modelName) {
                window.myModel = JSON.parse(JSON.stringify(_NKModels[modelFamily][model]));
            }
        }
    }
    if (Object.keys(window.myModel).length === 0) {
        window.myModel = JSON.parse(JSON.stringify(data));
        if (!("names" in window.myModel)) {
            window.myModel['names'] = {};
            for (var state in data.states) {
                window.myModel['names'][state] = state;
            }
            for (var param in data.params) {
                window.myModel['names'][param] = param;
            }
        }
    }
    for (var state in data.states) {
        var h6 = document.createElement("h6");
        h6.textContent = window.myModel['names'][state];
        leftc.appendChild(h6);
        var inputElement = document.createElement("input");
        inputElement.setAttribute('type', "text");
        inputElement.setAttribute('name', state);
        inputElement.setAttribute('entryType', "states");
        inputElement.classList.add("modelInput");
        $(inputElement).css({ 'min-width': '60%' });
        inputElement.value = data['states'][state];
        leftc.appendChild(inputElement);
    }

    for (var param in data.params) {
        if (param != "name") {
            var h6 = document.createElement("h6");
            h6.textContent = window.myModel['names'][param];
            middlec.appendChild(h6);
            var inputElement = document.createElement("input");
            inputElement.setAttribute('type', "text");
            inputElement.setAttribute('name', param);
            inputElement.setAttribute('entryType', "params");
            inputElement.classList.add("modelInput");
            $(inputElement).css({ 'min-width': '60%' });
            inputElement.value = data['params'][param];
            middlec.appendChild(inputElement);
        }
    }

    // Add the overlay closing functionality
    document.body.appendChild(overlay);
    $('.NeuGFX-overlay').on('click', function (e) {
        e.stopPropagation();
    });
    var _simID = simID;
    $(document).unbind( "click" );
    $(document).on('click', function (event) {
        console.log('_simID value:', _simID)
        window.getModelData(function () {
            var configName = $(simIDs[_simID]).attr('tooltip-data').split(" :: ")[0];
            console.log('simIDs[_simID]', simIDs[_simID]);
            console.log('configName', configName);
            // console.log('Saving the following config:', window.simModels[_simID]);
            // window.fbl.experimentConfig['cartridge'][configName] = window.simModels[simID];
            window.fbl.experimentConfig['lastUpdated'] = configName;
            $('.NeuGFX-overlay').remove();
        }, window.simModels[simID]);
    });
    var configName = $(simIDs[simID]).attr('tooltip-data').split(" :: ")[0];
    if (!(window.fbl.experimentConfig['cartridge'].updated.includes(configName))) {
        console.log(window.fbl.experimentConfig['cartridge'].updated);
        console.log(configName);
        window.fbl.experimentConfig['cartridge'].updated.push(configName);
    }
}

$(neuron_selector).on("click contextmenu", function (e) {
    getModelData(function () { $('.NeuGFX-overlay').remove(); });
    e.preventDefault();
    simID = $(this).attr('simID');
    var simModel = window.simModels[simID];
    if (e.type == "contextmenu") {
        // Create the Overlay Div
        createOverlay(simID, simModel);
    }
});
