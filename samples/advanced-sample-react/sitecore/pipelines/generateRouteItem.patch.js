export const config = (pipelines) => {
  const pipeline = pipelines.getPipeline('generateManifest');
  pipeline.addProcessor({
    name: 'hello-world',
    process(args) {
      console.log('Hello manifest pipeline extension!');
      return args;
    },
  });
};
