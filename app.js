d3.json("samples.json").then((samples) => {
    // console.log(importedData);
    var data = samples;

    // console.log(data)

  
    var samples = data.samples;
    
    console.log(samples)

    d3.selcetAll("#selDataset").on("change", updatePlotly);
   
    function updatePlotly() {
        var dropMenu = d3.select("#selDataset");
        var selection = dropMenu.property("value")
    }


    // Sort the data array using the greekSearchResults value
   samples.sort(function(a, b) {
      return (parseFloat(b.sample_values) - parseFloat(a.sample_values)).slice(0, 10);
    });

    console.log(data)
    // Slice the first 10 objects for plotting
    top10 = barSamples.slice(0, 10);
    console.log(top10)
})
    // topLables = 
    // Reverse the array due to Plotly's defaults
    // data = data.reverse();
  
    