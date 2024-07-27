export const regions = {
    EMEA: { name: "Europe, Middle East and Africa" },
    NA: { name: "North America" },
    LATAM: { name: "Latin America" },
    APAC: { name: "Asia-Pacific" }
};

export const determineRegion = (country) => {
    const naCountries = ["United States", "Canada"];
    const latamCountries = ["Mexico", "Brazil", "Argentina", "Colombia", "Peru", "Chile", "Venezuela", "Ecuador", "Guatemala", "Cuba"];
    const apacCountries = ["China", "Japan", "South Korea", "India", "Australia", "Indonesia", "Thailand", "Malaysia", "Singapore", "Philippines"];

    if (naCountries.includes(country)) return "NA";
    if (latamCountries.includes(country)) return "LATAM";
    if (apacCountries.includes(country)) return "APAC";
    return "EMEA";
};