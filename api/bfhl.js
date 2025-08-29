export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Method not allowed" });
  }

  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphaConcat = [];

    for (const item of data) {
      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(item.toString());
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat.push(...item.split(""));
      } else {
        special_characters.push(item);
      }
    }

    const concat_string = alphaConcat
      .reverse()
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
}
