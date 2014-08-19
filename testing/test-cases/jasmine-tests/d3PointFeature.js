/*global describe, it, expect*/

describe("d3 point feature", function () {
  "use strict";

  var map, width = 800, height = 600, layer, feature1, feature2, feature3;

  map = geo.map({node: "#map", center: [0, 0], zoom: 3});
  map.createLayer("osm");
  layer = map.createLayer("feature", {"renderer": "d3Renderer"});

  map.resize(0, 0, width, height);

  it("Add features to a layer", function () {
    var selection;
    feature1 = layer.createFeature("point")
      .positions([geo.latlng(0, 0), geo.latlng(10, 0), geo.latlng(0, 10)])
      .style({color: [1, 0, 0], size: [5]});
    map.draw();

    selection = d3.select("#map svg").selectAll("circle");
    expect(selection[0].length).toBe(3);

    feature2 = layer.createFeature("point")
      .positions([geo.latlng(-10, -10), geo.latlng(10, -10)])
      .style({color: [0, 1, 0], size: [8]});
    map.draw();
    
    selection = d3.select("#map svg").selectAll("circle");
    expect(selection[0].length).toBe(5);

    feature3 = layer.createFeature("point")
      .positions([geo.latlng(-10, 10)])
      .style({color: [0, 0, 1], size: [10]});
    map.draw();
    
    selection = d3.select("#map svg").selectAll("circle");
    expect(selection[0].length).toBe(6);
  });

  it("Remove a feature from a layer", function () {
    var selection;

    layer.deleteFeature(feature2);
    map.draw();

    selection = d3.select("#map svg").selectAll("circle");
    expect(selection[0].length).toBe(4);
  });
  it("Remove all features from a layer", function () {
    var selection;

    layer.clear();
    map.draw();

    selection = d3.select("#map svg").selectAll("circle");
    expect(selection[0].length).toBe(0);
  });
});
