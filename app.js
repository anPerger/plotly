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
        // console.log(metaData)
        if (data[metaData].id === Number(id)) {
            return data[metaData]
        }
    }
}
// sort and slice data from samples of choosen id
function sortSlice (data) {
    data.sampleValues = data.sample_values.slice(0,10);
    data.otuIDs = data.otu_ids.slice(0,10);
    data.otuLabels = data.otu_labels.slice(0, 10)
    return data
    // console.log(data.sampleValues)
        
}
// makes chart with sorted samples of selected id
function makeChart (data) {
    data.otuIDs = data.otuIDs;
    data.top10 = data.sampleValues;
    
    // console.log(data.otuIDs)
    let trace = {
        y: data.otuIDs,
        x: data.top10,
        type: 'bar',
        orientation: 'h',
        text: data.otuLabels

    };
    let layout = {
        title: 'top 10 bacteria',
        xaxis: { title: 'amount of bacteria'},
        yaxis: { title: 'OTU ID Number'}
      };

    let barTrace = [trace];
    Plotly.newPlot('bar', barTrace, layout)
}
// makes demographic table for choosen id
function makeTable (data) { 

    
    let metaValues = {
        'id': data.id,
        'ethnicity': data.ethnicity,
        'gender': data.gender,
        'age': data.age,
        'location': data.location,
        'bbtype': data.bbtype,
        'wfreq': data.wfreq,
    }
        // console.log(metaValues)
        // d3.select('sample-metadata').append(metaValues)
        // append a table
    d3.select('#sample-metadata').selectAll('*').remove();
    const tbody = d3.select('#sample-metadata').append('tbody');
   

    Object.entries(metaValues).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        const row = tbody.append('tr');
        row.append('td').text(`${key}: ${value}`)
            
    

    //     for (const demoData in metaValues) {

    // // console.log to make sure all objects were selected
    // // console.log(ufoSighting);
                
    //         const row = tbody.append('tr');
    //         Object.values(demoData).forEach(value => {
    //   // Append a cell to the row for each value
    //   // in the ufo object
    //         var cell = row.append('td');
    //         cell.text(metaValues[value]);

    //         })
         })
}
// makes bubble chart of all samples from choosen id
function makeBubble (data) {
    data.allOTUs = data.otu_ids;
    data.allValues = data.sample_values;
    let trace1 = {
        x: data.allOTUs,
        y: data.allValues,
        mode: 'markers',
        // marker: {
        //   color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //   opacity: [1, 0.8, 0.6, 0.4],
        //   size: [40, 60, 80, 100]
        // }
      };
      
    let demo = [trace1];
      
    let layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 600
      };
      
    Plotly.newPlot('bubble', demo, layout);

}
// loads json data and sets variables to work with the data
d3.json('samples.json').then((samples) => {
    // console.log(importedData);
    const data = samples;
    // console.log(data)
    const dataSamples = data.samples;
    const metaData = data.metadata;
    console.log(metaData)

// activates dropdown menue and calls functions from above
    const dropDown = d3.select('#selDataset');
    // console.log(metaData)
    // console.log(dataSamples)

    // Sort the data array using the sample results
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
        // console.log(selection)
        const selectionSample = getSampleID(dataSamples, selection);
        const metaSample = getMetaID(metaData, selection);
        // console.log(metaSample)
        // console.log(selectionSample)
        
        const sortedSample = sortSlice(selectionSample);
        // console.log(sortedSample)
        makeBubble(selectionSample);
        makeChart(sortedSample);
       
        makeTable(metaSample)
    });
});

  