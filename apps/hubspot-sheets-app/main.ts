const main = async (): Promise<void> => {
  console.log(`Starting integration hubspot sheet app`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});