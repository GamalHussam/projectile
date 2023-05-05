import math

# Distance from goal
d = float(input("Enter distance from goal in meters: "))

# Firing angle
theta = float(input("Enter firing angle in degress: "))

# Firing velocity
v0 = float(input("Enter firing velocity in m/s: "))

# Calculate time to reach max height
t1 = v0 * math.sin(math.radians(theta)) / 9.8

# Calculate maximum ball height
h_max = v0 * math.sin(math.radians(theta)) * t1 - 0.5 * 9.8 * t1 ** 2

# Calculate time to reach goal line
t2 = d / (v0 * math.cos(math.radians(theta)))

# Calculate ball height at goal plane arrival point
h_goal = h_max - 0.5 * 9.8 * (t2 - t1) ** 2

print("Maximum ball height is: " + str(h_max))
print("Ball height at goal plane arrival point is : " + str(h_goal))
