import numpy as np

# Given data
a_values = np.array([40, 30, 60, 18, 22, 50])
b_values = np.array([60, 80, 25, 110, 100, 40])
xPensil_values = np.array([368.5, 270.5, 452.5, 0, 70.5, 429.5])
xIntersect_values = np.array([639.71, 664.166, 603.497, 696.254, 690.537, 615.631])

# Perform linear regression
coefficients_xPensil = np.polyfit(a_values, xPensil_values, 1)
coefficients_xIntersect = np.polyfit(b_values, xIntersect_values, 1)

# Print the formulas
formula_xPensil = f"{coefficients_xPensil[0]:.2f} * a + {coefficients_xPensil[1]:.2f}"
formula_xIntersect = f"{coefficients_xIntersect[0]:.2f} * b + {coefficients_xIntersect[1]:.2f}"

print(f"a = {formula_xPensil}")
print(f"b = {formula_xIntersect}")
