import unittest
from dfa_engine import analyze_password

class PasswordDFATests(unittest.TestCase):
    def test_weak_short_password(self):
        result = analyze_password("abc")
        self.assertEqual(result["strength"], "Weak")
        self.assertEqual(result["state"], "q000")

    def test_medium_with_digit(self):
        result = analyze_password("abcdef12")
        self.assertEqual(result["strength"], "Medium")
        self.assertEqual(result["state"], "q110")

    def test_strong_with_digit_and_special(self):
        result = analyze_password("Abcdef12!")
        self.assertEqual(result["strength"], "Strong")
        self.assertEqual(result["state"], "q111")

    def test_medium_with_special_only(self):
        result = analyze_password("abcdefgh!")
        self.assertEqual(result["strength"], "Medium")
        self.assertEqual(result["state"], "q101")

if __name__ == "__main__":
    unittest.main()
