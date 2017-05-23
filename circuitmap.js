
/* Circuit Map Javascrip/d3 */

(function () {
    var width = 960,
        height = 600;

    var svg = d3.select("body").append("svg")
        .attr("viewBox","0 0 " + width * 1.4  + " " + height * 1.2)
        .on('click', function () {d3.select('#tooltip').classed('hidden', true);});

    var projectionAlbers = d3.geo.albersUsa()
        .scale(1070)
        .translate([width / 2, height / 2]);

    /*var projectionGU = d3.geo.mercator()
        .scale(1700)
        .translate([(width / 2)-4550, (height / 2)+800])
        .precision(0.1);*/

    var path = d3.geo.path();
    var pathAlbers = d3.geo.path()
        .projection(projectionAlbers);

    /*var path = d3.geo.path();
    var pathGU = d3.geo.path()
        .projection(projectionGU);*/

    var selected = {
      "23": 1, "25": 1, "33": 1, "72": 1, "44": 1, "09": 2, "36": 2,
      "50": 2, "10": 3, "34": 3, "42": 3, "78": 3, "24": 4, "37": 4,
      "45": 4, "51": 4, "54": 4, "22": 5, "28": 5, "48": 5, "21": 6, "26": 6,
      "39": 6, "47": 6, "17": 7, "18": 7, "55": 7, "05": 8, "19": 8, "27": 8,
      "29": 8, "31": 8, "38": 8, "46": 8, "02": 9, "06": 9, "66": 9, "15": 9,
      "16": 9, "30": 9, "32": 9, "41": 9, "53": 9, "04": 9, "08": 10, 
      "20": 10, "35": 10, "40": 10, "49": 10, "56": 10, "01": 11, "12": 11, 
      "13": 11, "11": 'DC'
    };

    var dot_info = [
                      { "cx": 840, "cy": height - 450, "circuit":1, "adjust":0, "circuittext": "First Circuit", "nojudges": 9, "url": "http://www.ca1.uscourts.gov/", 
                      "listhtml": "" },

                      { "cx": 760, "cy": height - 440, "circuit":2, "adjust":0, "circuittext": "Second Circuit", "nojudges": 22, "url": "http://www.ca2.uscourts.gov/", 
                     "listhtml": "<p>John Walker&nbsp;<a href='https://www.documentcloud.org/documents/1106428-walker-starrinternational-v-federalreservebankny.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 720, "cy": height - 380, "circuit":3, "adjust":0, "circuittext": "Third Circuit" ,"nojudges": 24, "url": "http://www.ca3.uscourts.gov/", 
                     "listhtml": "<p>Jane Roth&nbsp;<a href='https://www.documentcloud.org/documents/1106427-roth-ruthkoronthaly-v-lorealusa.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 720, "cy": height - 290, "circuit":4, "adjust":0, "circuittext": "Fourth Circuit", "nojudges": 14, "url": "http://www.ca4.uscourts.gov/", 
                     "listhtml":"<p>Allyson Duncan&nbsp;<a href='https://www.documentcloud.org/documents/1106412-duncan-amydfrancisco-v-verizonsouth.html' target='_blank' ><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106413-duncan-janicelawyer-v-verizoncommunications.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106414-duncan-paulinerowl-v.html' target='_blank'><img src='img/doc.png' width='18' height='18'><a><p>Barbara Keenan&nbsp;<a href='https://www.documentcloud.org/documents/1106424-keenan-bah-v-wellsfargo.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106425-keenan-zambrano-v-hsbc.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>" },

                      { "cx": 500, "cy": height - 180, "circuit":5, "adjust":0, "circuittext": "Fifth Circuit", "nojudges": 24, "url": "http://www.ca5.uscourts.gov/", 
                     "listhtml": "" },

                      { "cx": 665, "cy": height - 310, "circuit":6, "adjust":0, "circuittext": "Sixth Circuit", "nojudges": 23, "url": "http://www.ca6.uscourts.gov/", 
                     "listhtml": "<p>Helene White&nbsp;<a href='https://www.documentcloud.org/documents/1106429-white-johnwalker-philipmorrisusa.html' target='_blank' ><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106430-white-juliegeronimo-v-caterpillar.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106431-white-nationalcentury-amedisys-v-jpmorgan.html' target='_blank'><img src='img/doc.png' width='18' height='18'><a><a href='https://www.documentcloud.org/documents/1115439-white-hamilton-v-generalelectric.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1116435-white-columbus-v-hotels-com.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p><p>Deborah Cook&nbsp;<a href='https://www.documentcloud.org/documents/1106410-cook-coffman-v-fordmotorcompany.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 600, "cy": height - 380, "circuit":7, "adjust":0, "circuittext": "Seventh Circuit", "nojudges": 14, "url": "http://www.ca7.uscourts.gov/", 
                     "listhtml": ""},

                      { "cx": 500, "cy": height - 380, "circuit":8, "adjust":0, "circuittext": "Eighth Circuit", "nojudges": 15, "url": "http://www.ca8.uscourts.gov/", 
                     "listhtml": ""},

                      { "cx": 160, "cy": height - 400, "circuit":9, "adjust":0, "circuittext": "Ninth Circuit", "nojudges": 43, "url": "http://www.ca9.uscourts.gov/", 
                     "listhtml": "<p>Andrew Kleinfeld&nbsp;<a href='https://www.documentcloud.org/documents/1106426-kleinfeld-maloney-v-verizoninternetservices.html' target='_blank' ><img src='img/doc.png' width='18' height='18'></a></p> <p>Jay Bybee&nbsp;<a href='https://www.documentcloud.org/documents/1106408-bybee-salazarcastellano-v-holder.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><p>Arthur Alarcon&nbsp;<a href='https://www.documentcloud.org/documents/1106407-alarcon-francisfarina-v-cellcopartnership.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p><p>Sandra Ikuta&nbsp;<a href='https://www.documentcloud.org/documents/1106423-ikuta-sarei-v-riotinto.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 340, "cy": height - 290, "circuit":10, "adjust":4, "circuittext": "Tenth Circuit",  "nojudges": 20, "url": "http://www.ca10.uscourts.gov/", 
                     "listhtml": "<p>Stephanie Seymour&nbsp;<a href='https://www.documentcloud.org/documents/1106456-seymour-allison-v-boeinglasertechnicalservices.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 680, "cy": height - 160, "circuit":11, "adjust":4, "circuittext": "Eleventh Circuit", "nojudges": 16, "url": "http://www.ca11.uscourts.gov/", 
                     "listhtml": "<p>James Hill&nbsp;<a href='https://www.documentcloud.org/documents/1106417-hill-johnnytraylor-v-partnershiptitleco.html' target='_blank' ><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106418-hill-lindawolickigables-v-arrowinternational.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><a href='https://www.documentcloud.org/documents/1106419-hill-pncbank-v-bb-amp-t.html' target='_blank'><img src='img/doc.png' width='18' height='18'><a><a href='https://www.documentcloud.org/documents/1106420-hill-pncbank-v-colonialbank-bb-amp-t.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p><p>Frank Hull&nbsp;<a href='https://www.documentcloud.org/documents/1106421-hull-brown-v-jacobsengineering.html' target='_blank' ><img src='img/doc.png' width='18' height='18'></a></p> <p>Joel Dubina&nbsp;<a href='https://www.documentcloud.org/documents/1106411-dubina-guillermoramirez-v-eidupontdenemours.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a><p>Peter Fay&nbsp;<a href='https://www.documentcloud.org/documents/1106416-fay-peters-v-hartfordlife-walmart.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},

                      { "cx": 780, "cy": height - 340, "circuit":'DC', "adjust":6, "circuittext": "District of Columbia Circuit", "nojudges": 16, "url":"http://www.cadc.uscourts.gov/", 
                     "listhtml": ""},

                      { "cx": 780, "cy": height - 310, "circuit":'FED', "adjust":9 , "circuittext": "Federal Circuit", "nojudges":18, "url": "http://www.cafc.uscourts.gov/", 
                     "listhtml": "<p>Raymond Clevenger&nbsp;<a href='https://www.documentcloud.org/documents/1106409-clevenger-priceplay-v-google.html' target='_blank'><img src='img/doc.png' width='18' height='18'></a></p>"},];


    function popup_window(d) {

                  var coords = d3.mouse(svg.node());
                       d3.select('#tooltip')
                             .style('left', (coords[0]-30) + 'px')
                             .style('top', (coords[1]-30) + 'px')
                              .html('<span class = "label-text"><a href="' + d.url + '" target="_blank" style="text-decoration:none; " >' + d.circuittext + '</a></span><br><p class = "label-value"> Number of Judges: </p><span class = "label-value-nojudges">' +  d.nojudges + '</span><span class = "list">' + d.listhtml +'</span>');
                        d3.select('#tooltip').classed('hidden', false);
    }

    function highlight(d) {
        svg.selectAll(".state")
                .classed("selected",function (state) {
                    if (state.properties.FIPS in selected && d.properties.FIPS in selected &&
                        selected[d.properties.FIPS] == selected[state.properties.FIPS]) {
                        return true;
                    }
                    return false;
                });

        // var that = this;

        if (d.properties.FIPS in selected) {
          dot_info.forEach(function (dot) {
            if (dot.circuit == selected[d.properties.FIPS]) {
              popup_window(dot);
            }
          });
        }
    }

    function unhighlight(d) {
    }

    d3.json("us.json", function(error, us) {
        var states = topojson.feature(us, us.objects.layer1);
        var statePaths = svg.selectAll(".state")
                            .data(states.features);
        statePaths.enter()
                  .append("path")
                    .attr("class", "state")
                    .on("mouseover", highlight)
                    .on("mouseout", unhighlight)
                    .attr("d", pathAlbers)
                    .on('click', function () {d3.select('#tooltip').classed('hidden', true);});

        // statePaths.style("stroke","black");
        // statePaths.exit().remove();

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.layer1, function(a, b) { return selected[a.properties.FIPS] !== selected[b.properties.FIPS]; }))
            .attr("class", "circuit-boundary")
            .attr("d", pathAlbers);

        svg.selectAll(".place-label")
            .data(states.features)
            .enter().append("text")
            .attr("class", "place-label")
            .attr("y", height/2 - 247)
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .text(function(d) { return d.properties.STATE; })


        svg.selectAll("circle")
                       .data(dot_info)
                       .enter()
                       .append("circle")
                       .attr("r", 15)
                       .attr("class", "dot")
                       .attr("cx", function(d) { return d.cx; })
                       .attr("cy", function(d) { return d.cy; })
                       .on('mouseover', popup_window)        
  
        svg.selectAll("circuitno")
                       .data(dot_info)
                       .enter()
                       .append("text")
                       .attr("class", "circuitno")
                       .text(function(d) { return d.circuit; })
                       .attr("dx", function(d) { return d.cx - d.adjust - 4 ; } )
                       .attr("dy", function(d) { return d.cy + 5; } )
                       .on('mouseover', popup_window)

      svg.append("foreignObject")
          .attr("width", 150)
          .attr("height", 100)
          .attr("x", 10 )
          .attr("y", 370 )
        .append("xhtml:body")
          .attr("class", "notes")
          .html("<b>Ninth Circuit</b> also includes <b>District of Guam</b> & <b>District of the Northern Mariana Islands</b>");

      svg.append("foreignObject")
          .attr("width", 150)
          .attr("height", 100)
          .attr("x", 760)
          .attr("y", 40 )
        .append("xhtml:body")
          .attr("class", "notes")
          .html("<b>First Circuit</b> also includes <b>District of Puerto Rico</b>");

          svg.append("foreignObject")
          .attr("width", 130)
          .attr("height", 100)
          .attr("x", 800 )
          .attr("y", 240 )
        .append("xhtml:body")
          .attr("class", "notes")
          .html("<b>Third Circuit</b> also includes <b>District of the Virgin Islands</b>");


      //Guam
      /*svg.append("path")
            .datum(states)
            .attr("class", "state")
            .attr("d", pathGU);

       svg.append("path")
            .datum(topojson.mesh(us, us.objects.layer1, function(a, b) { return a !== b; }))
            .attr("class", "state-boundary")
            .attr("d", pathGU);

        svg.append("path")
            .datum(selection)
            .attr("class", "state selected-boundary")
            .attr("d", pathGU);

        svg.append("path")
            .datum(selection)
            .attr("class", "state selected")
            .on("mouseover", function(){d3.select(this).style("fill", "aliceblue")})
            .on("mouseout", function(){d3.select(this).style("fill", "orange");})
            .attr("d", pathGU);*/

    });

    d3.select(self.frameElement).style("height", height + "px");

})();

