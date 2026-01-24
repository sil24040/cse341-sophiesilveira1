const routeTomClancy = (req, res) => res.send("Tom Clancy");
const routeJackRyan = (req, res) => res.send("Jack Ryan");
const routeJohnClark = (req, res) => res.send("John Clark");

// If you want these names instead, change your routes accordingly:
const routeSophieSilveira = (req, res) => res.send("Sophie Silveira");
const routeIvanRibeiro = (req, res) => res.send("Ivan Ribeiro");
const routeRosaSilveira = (req, res) => res.send("Rosa Silveira");

module.exports = {
  routeTomClancy,
  routeJackRyan,
  routeJohnClark,
  routeSophieSilveira,
  routeIvanRibeiro,
  routeRosaSilveira
};
