// retrieve sample id function
function getSampleID (data, id) {
    for(const sample in data) {
        //check sample
        if (data[sample].id === id) {
            return data[sample]
            
        }
    }
}
// retrieve metadata id function
function getMetaID (data, id) {
    for(const metaData in data) {
        //check sample
        if (data[metaData].id === id) {
            return data[metaData]
        }
    }
}
// sort and slice data from samples
function sortSlice (data) {
    data.sampleValues = data.sample_values.slice(0,10);
    data.otuIDs = data.otu_ids.slice(0,10);
    return data
    // console.log(data.sampleValues)
        
}

function makeChart (data) {
    data.otuIDs = data.otuIDs;
    data.top10 = data.sampleValues;
    console.log(data.top10)
    let trace = {
        x: data.otuIDs,
        y: data.top10,
        type: "bar"

    };
    let layout = {
        title: "top 10 bacteria",
        xaxis: { title: "bacteria" },
        yaxis: { title: "amount"}
      };

    let barTrace = [trace];
    Plotly.newPlot("bar", barTrace, layout)
}
d3.json('samples.json').then((samples) => {
    // console.log(importedData);
    const data = samples;
    // console.log(data)
    const dataSamples = data.samples;
    const metaData = data.metadata;
    const dropDown = d3.select('#selDataset');
    // console.log(metaData)
    // console.log(dataSamples)
    // Sort the data array using the greekSearchResults value
    const options = dropDown.selectAll('option').data(dataSamples).enter();
    // console.log(dataSamples)
    options
        .append('option')
        .attr('value', (d) => {
            // console.log(d)
                return d.id;
        })
        .text((d) => {
            return d.id;
        });
    
    dropDown.on('change', () => {
        let selection = dropDown.property('value');
        console.log(selection)
        const selectionSample = getSampleID(dataSamples, selection)
        
        // console.log(selectionSample)
        
        const sortedSample = sortSlice(selectionSample)
        console.log(sortedSample)

        makeChart(sortedSample)
        
    });
});

    
    // let trace = {
    //     x: sortedSamples.otuIDs,
    //     y: sortedSamples.sampleValues,
    //     type: "bar"

    // };
    // let layout = {
    //     title: "top 10 bacteria",
    //     xaxis: { title: "bacteria" },
    //     yaxis: { title: "amount"}
    //   };

    // let barTrace = [trace];
    // plotly.newPlot("bar", barTrace, layout)
 

//     console.log(dataSamples)
//     // Slice the first 10 objects for plotting
//     top10 = barSamples.slice(0, 10);
//     console.log(top10)
// })
    // topLables = 
    // Reverse the array due to Plotly's defaults
    // data = data.reverse();