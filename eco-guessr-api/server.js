const express = require('express');
const app = express();
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});const cors = require('cors');
app.use(cors());

const locations = [
    {
        name: "Arctic (Sea Ice Loss)",
        coords: [65.2482, -60.4621],
        beforeImageUrl: "https://fortune.com/img-assets/wp-content/uploads/2018/12/GettyImages-973103362-e1545954446452.jpg",
        afterImageUrl: "https://climate.nasa.gov/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0VyIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bcb4a9e193ecb8477281a8eee2d7263e0b7426b4/main_image.jpg",
        facts: [
          "The Arctic has experienced significant warming at twice the rate of the global average, leading to a loss of sea ice.",
          "Summer sea ice extent has declined by over 40% since 1979."
        ]
      },
      {
        name: "Amazon Rainforest, Brazil",
        coords: [-3.4653, -62.2159],
        beforeImageUrl: "https://c02.purpledshub.com/uploads/sites/41/2023/05/Everything-you-need-to-know-about-the-Amazon-Rainforest-4a50b10.jpg",
        afterImageUrl: "https://blogs.edf.org/climate411/wp-content/blogs.dir/7/files/2020/07/RainforestLogged_iStock_000003587471_RF2.jpg",
        facts: [
          "Deforestation rates have surged, exacerbated by fires set for agriculture and cattle ranching.",
          "This leads to reduced carbon sequestration, accelerating global warming."
        ]
      },
      {
        name: "Great Barrier Reef, Australia",
        coords: [-18.2871, 147.6992],
        beforeImageUrl: "https://cdn.britannica.com/64/155864-050-34FBD7A2/view-Great-Barrier-Reef-Australia-coast.jpg",
        afterImageUrl: "https://images.newscientist.com/wp-content/uploads/2016/06/16160745/gettyimages-102215207.jpg",
        facts: [
          "Coral bleaching events, due to higher sea temperatures, have killed large portions of the reef.",
          "Over 50% of the reef has died since 1995."
        ]
      },
      {
        name: "California Wildfires",
        coords: [36.7783, -119.4179],
        beforeImageUrl: "https://readyforwildfire.org/wp-content/uploads/2024/02/DJI_0679_RT-1600x900.jpg",
        afterImageUrl: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2500x1667+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F87%2Fbf%2Fb0ab80904b6cab3747c9bd8d952d%2Fap24208602950233.jpg",
        facts: [
          "Wildfires in California are becoming more frequent and severe due to prolonged droughts and higher temperatures.",
          "The 2020 wildfire season was one of the worst on record."
        ]
      },
      {
        name: "Siberian Permafrost Thaw",
        coords: [67.0, 134.0],
        beforeImageUrl: "https://indiandefencereview.com/wp-content/uploads/2025/03/A-novel-nematode-species-from-the-Siberian-permafrost.jpg",
        afterImageUrl: "https://www.science.org/do/10.1126/science.abe0581/full/main_batagai_1280p2-1644908614533.jpg",
        facts: [
          "Thawing permafrost is releasing methane, a potent greenhouse gas, into the atmosphere.",
          "Permafrost in Siberia is estimated to hold about 1.5 trillion metric tons of carbon."
        ]
      },
      {
        name: "Maldives (Rising Sea Levels)",
        coords: [3.2028, 73.2207],
        beforeImageUrl: "https://media.glamourmagazine.co.uk/photos/6645c61272a9b47788824369/16:9/w_1920,h_1080,c_limit/Nova%20Hotel%20Review%20160524%203-4-SCALED%20COPY.jpg",
        afterImageUrl: "https://assets.weforum.org/editor/wGh__xixnoi-s9Tswk7zZoCxiXIPG3FKbwDGCKki3ME.PNG",
        facts: [
          "Sea levels are rising at a rate that threatens to submerge low-lying islands.",
          "The Maldives are projected to be completely underwater by the end of the century if current trends continue."
        ]
      },
      {
        name: "Lake Chad, Africa",
        coords: [13.4695, 14.9241],
        beforeImageUrl: "https://kumakonda.es/wp-content/uploads/2023/11/Lago-Chad-vacas-kuri.jpg",
        afterImageUrl: "https://i.natgeofe.com/n/be72f179-e8b8-49ea-8322-e2e5f89e90e7/jane-hahn-lake-chad-11_16x9.jpg?w=1200",
        facts: [
          "Lake Chad has shrunk by 90% in the last 50 years due to a combination of drought and water diversion.",
          "This impacts the livelihood of millions of people dependent on the lake for water and agriculture."
        ]
      },
      {
        name: "Greenland Ice Sheet",
        coords: [71.7069, -42.6043],
        beforeImageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/220222102020-10-greenland-ice-sheet-sea-level-rise.jpg?c=16x9&q=h_833,w_1480,c_fill",
        afterImageUrl: "https://media.cnn.com/api/v1/images/stellar/prod/220719172836-01-greenland-ice-melt-climate.jpg?c=original",
        facts: [
          "Greenland's ice sheet is losing mass at an accelerating rate.",
          "This contributes significantly to rising sea levels."
        ]
      },
      {
        name: "Mount Kilimanjaro, Tanzania",
        coords: [-3.0674, 37.3556],
        beforeImageUrl: "https://c.files.bbci.co.uk/CFE3/production/_127491235_glacierkilimanjaro.jpg",
        afterImageUrl: "https://gdb.voanews.com/09410000-0a00-0242-9e56-08dae2a5e193_cx0_cy18_cw0_w1080_h608.jpg",
        facts: [
          "Kilimanjaro's glaciers have shrunk by over 80% since the 1910s.",
          "Climate change is causing the glaciers to melt at an accelerated rate."
        ]
      },
      {
        name: "Iqaluit, Canada (Permafrost Thaw)",
        coords: [63.7467, -68.5167],
        beforeImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Iqaluit_skyline.jpg/1000px-Iqaluit_skyline.jpg",
        afterImageUrl: "https://live.staticflickr.com/455/32088681575_56d7742d2f.jpg",
        facts: [
          "Thawing permafrost is destabilizing infrastructure in Arctic communities.",
          "This leads to increased risk of flooding and damage to buildings and roads."
        ]
      },
      {
        name: "Kenya (Drought and Water Scarcity)",
        coords: [-1.2921, 36.8219],
        beforeImageUrl: "https://www.aljazeera.com/wp-content/uploads/2023/11/344B7VQ-highres-1700694001.jpg?resize=1170%2C780&quality=80",
        afterImageUrl: "https://static.zawya.com/view/acePublic/alias/contentid/MjkxMDUyMmItOTY3NS00/9/1335203490.webp",
        facts: [
          "Kenya is experiencing more frequent and severe droughts, affecting agriculture and water resources.",
          "Over 2 million people have faced water shortages due to decreasing rainfall."
        ]
      },
      {
        name: "Tibetan Plateau (Glacial Retreat)",
        coords: [35.7614, 92.0897],
        beforeImageUrl: "https://tibet.net/wp-content/uploads/2021/10/Screenshot-2021-10-25-at-9.28.50-AM.jpg",
        afterImageUrl: "https://wwfint.awsassets.panda.org/img/original/glacier.jpg",
        facts: [
          "The Tibetan Plateau is experiencing significant glacial retreat due to rising temperatures.",
          "Over 80% of glaciers in the region are retreating, affecting water supplies for millions."
        ]
      },
      {
        name: "Himalayas (Glacier Retreat)",
        coords: [28.6895, 93.4418],
        beforeImageUrl: "https://media.npr.org/assets/img/2012/04/23/everest-khumbu-glacier_wide-97cb7976495ebd16ea30be0a1c994f0214142893.jpg?s=1100&c=50&f=jpeg",
        afterImageUrl: "https://i.natgeofe.com/n/bbc54fa8-b6fb-4c6c-9de2-dc3f2323ecd6/glacial-lakes-gokyo-village-nepal.jpg",
        facts: [
          "The glaciers in the Himalayas have been retreating at a rapid pace due to rising temperatures.",
          "This impacts millions of people who rely on the glaciers for freshwater during dry seasons."
        ]
      },
      {
        name: "Sahel Region, Africa",
        coords: [15.5, 0],
        beforeImageUrl: "https://cdn.britannica.com/33/146033-050-1F84E56E/Sahel-rain-season-Bamako-Mali-Kayes.jpg",
        afterImageUrl: "https://www.aljazeera.com/wp-content/uploads/2012/06/2012624215938822282_8.jpeg",
        facts: [
          "The Sahel region is experiencing increased desertification and droughts.",
          "The land is becoming less productive, affecting food security for millions of people."
        ]
      },
      {
        name: "Antarctic Ice Shelf Retreat",
        coords: [-82.0, 135.0],
        beforeImageUrl: "https://cdn.britannica.com/08/135708-050-2346C1CF/Paradise-Bay-Antarctica.jpg",
        afterImageUrl: "https://static.scientificamerican.com/sciam/cache/file/EF5D6726-5BC0-462C-974444E9352BF568_source.jpg?crop=4%3A3%2Csmart&w=1200",
        facts: [
          "The Antarctic ice shelves are breaking up and retreating due to warming ocean waters.",
          "The melting ice is contributing to global sea level rise."
        ]
      }
      ];
      
      app.get('/get-random-location', (req, res) => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const response = {
      ...randomLocation,
      coords: randomLocation.coords,
      };
      
      res.json(response);
      });