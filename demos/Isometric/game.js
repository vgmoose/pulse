PFPlay.ready(function initGame() {
  
  var rows = 25;
  var columns = 25;
  
  var tileWidth = 30;
  var tileHeight = 15;
  
  var width = 760;
  var height = 480;
  
  var engine = new PFPlay.Engine({ gameWindow: 'gameWindow', iframe: false, width: 760, height: 480 });
  var scene = new PFPlay.Scene();
  var layer = new Board({y: 50});
  layer.anchor = { x: 0, y: 0 };
  
  var uiLayer = new PFPlay.Layer({width: 500, height:100, x:130,  y:350});
  
  var offsetY = rows * tileHeight;
  
  var tiles = [ ];
  
  var normalTexture = new PFPlay.Image( { src: 'tile.png' });
  var selectedTexture = new PFPlay.Image( { src: 'selected.png '});
    
  // Create and layout tiles.
  for(var rowIdx = 0; rowIdx < rows; rowIdx++) {
    for(var colIdx = 0; colIdx < columns; colIdx++) {
      
      var tile = new PFPlay.Sprite({ src: normalTexture });
      
      var x = colIdx * (tileWidth / 2) + (rowIdx * (tileWidth / 2));
      var y = colIdx * (tileHeight / 2) - (rowIdx * (tileHeight / 2)) + (offsetY / 2);

      tile.move(x, y);
      tile.row = rowIdx;
      tile.col = colIdx;
          
      layer.addNode(tile);
      
      tiles.push(tile);
    }
  }
  
  // Create UI.
  var creepA = new PFPlay.Sprite({ src: 'creepA.png' });
  var creepB = new PFPlay.Sprite({ src: 'creepB.png' });
  var creepC = new PFPlay.Sprite({ src: 'creepC.png' });
  var creepD = new PFPlay.Sprite({ src: 'creepD.png' });
  creepD.alpha = 50;
  
  creepA.position = { x: 10, y: 25 };
  creepB.position = { x: 70, y: 25 };
  creepC.position = { x: 130, y: 25 };
  creepD.position = { x: 190, y: 25 };
  
  creepA.events.bind('click',
    function() {
      console.log('Creep A clicked');
    });
  
  uiLayer.addNode(creepA);
  uiLayer.addNode(creepB);
  uiLayer.addNode(creepC);
  uiLayer.addNode(creepD);
  
  var hoveredTile = null;
  
  layer.events.bind('mousemove', 
    function(pos) {
      var isoPos = worldToIso(pos.position.x, pos.position.y);
        for(var idx in tiles) {
          if(tiles[idx].row == isoPos.x && tiles[idx].col == isoPos.y) {
            tiles[idx].texture = selectedTexture;
          }
        }
      });
  
  function worldToIso(posX, posY) {
    dx = posX - tileWidth;
    dy = posY + (tileHeight / 2) - (offsetY / 2);
    isoY = Math.floor((dy + dx / 2) * (2 / 2) / (tileWidth / 2)); 
    isoX = -Math.floor((dy - dx / 2) * (2 / 2) / (tileWidth / 2)) + 1;
    return {x:isoX, y:isoY};
  }
  
  var go = function() {
    scene.addLayer(layer);
    scene.addLayer(uiLayer);
    engine.scenes.addScene(scene);
    engine.scenes.activateScene(scene);
    engine.go(50, loop);
  }
  
  window.setTimeout(go, 500);
});

function loop(sceneManager) {
  var debugTime = document.getElementById('time');
  debugTime.innerText = PFPlay.masterTime;
}
