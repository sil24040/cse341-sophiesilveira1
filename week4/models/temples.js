module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      temple_id: Number,
      name: String,
      location: String,
      dedicated: String,
      additionalInfo: Boolean,
    },
    { timestamps: true }
  );

  // Model name = Temple
  // Collection name = temples  (FORCED)
  const Temple = mongoose.model("Temple", schema, "temples");

  return Temple;
};
