const {
  ArtEngine,
  inputs,
  generators,
  renderers,
  exporters,
} = require("@hashlips-lab/art-engine");

const BASE_PATH = __dirname;

const ae = new ArtEngine({
  cachePath: `${BASE_PATH}/cache`,
  outputPath: `${BASE_PATH}/output`,
  useCache: true,

  inputs: {
    og: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/input/skull-r`,
    }),
    half: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/input/HalfSkull-r`,
    }),
    frank: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/input/Frank-r`,
    }),
  },

  generators: [
    new generators.ImageLayersAttributesGenerator({
      dataSet: "og",
      startIndex: 1,
      endIndex: 5555,
    }),
    new generators.ImageLayersAttributesGenerator({
      dataSet: "half",
      startIndex: 5556,
      endIndex: 6666,
    }),
    new generators.ImageLayersAttributesGenerator({
      dataSet: "frank",
      startIndex: 6667,
      endIndex: 9999,
    }),
  ],

  renderers: [
    new renderers.ItemAttributesRenderer({
      name: (itemUid) => `Human #${itemUid}`,
      description: (attributes) => {
        return `In a distant future, humanity faced its greatest challenge: an apocalyptic event known as "Doomsday." This cataclysmic event wiped out most of civilization, leaving the world in ruins. The ruins of lost humans, known as "Doomsday Humans," are the remnants of humanity.`;
      },
    }),
    new renderers.ImageLayersRenderer({
      width: 1000,
      height: 1000,
    }),
  ],

  exporters: [
    new exporters.ImagesExporter(),
    new exporters.Erc721MetadataExporter({
      imageUriPrefix:
        "https://raw.githubusercontent.com/kritik-sah/doomsdayhuman-generator/main/output/images/",
    }),
    new exporters.SolMetadataExporter({
      imageUriPrefix:
        "https://raw.githubusercontent.com/kritik-sah/doomsdayhuman-generator/main/output/images/",
      symbol: "HUMANS",
      sellerFeeBasisPoints: 200,
      collectionName: "Doomsday Human",
      creators: [
        {
          address: "__SOLANA_WALLET_ADDRESS_HERE__",
          share: 100,
        },
      ],
    }),
  ],
});

(async () => {
  await ae.run();
  await ae.printPerformance();
})();
