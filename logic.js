(function (root) {
  const DAY_MS = 24 * 60 * 60 * 1000;

  const GROCERY_RULES = [
    { match: 'chicken', label: 'Chicken bulk pack', keywords: ['chicken'] },
    { match: 'ground turkey', label: 'Ground turkey or lean beef', keywords: ['ground turkey', 'turkey', '93/7 beef', 'lean beef', 'beef'] },
    { match: 'pork tenderloin', label: 'Pork tenderloin', keywords: ['pork tenderloin', 'pork loin', 'lean pork', 'pork'] },
    { match: 'shrimp', label: 'Shrimp', keywords: ['shrimp'] },
    { match: 'tofu or edamame', label: 'Tofu or edamame', keywords: ['tofu', 'edamame'] },
    { match: 'eggs', label: 'Eggs', keywords: ['eggs', ' egg,', ' egg ', '3 eggs', '2 eggs'] },
    { match: 'liquid egg whites', label: 'Liquid egg whites', keywords: ['egg whites'] },
    { match: 'greek yogurt', label: 'Greek yogurt', keywords: ['greek yogurt', 'yogurt', 'tzatziki'] },
    { match: 'cottage cheese', label: 'Cottage cheese', keywords: ['cottage cheese'] },
    { match: 'whey protein', label: 'Whey protein', keywords: ['whey', 'protein powder', 'protein Creami'] },
    { match: 'cauliflower rice', label: 'Cauliflower rice', keywords: ['cauliflower rice', 'cauli rice'] },
    { match: 'rice', label: 'Rice', keywords: ['rice'] },
    { match: 'oats', label: 'Oats', keywords: ['oats'] },
    { match: 'potatoes', label: 'Potatoes', keywords: ['potato', 'potatoes'] },
    { match: 'pasta', label: 'Pasta', keywords: ['pasta', 'elbow'] },
    { match: 'tortillas', label: 'Tortillas/wraps', keywords: ['tortilla', 'wrap', 'pita'] },
    { match: 'beans/lentils', label: 'Beans/lentils', keywords: ['beans', 'black beans', 'lentils', 'lentil'] },
    { match: 'frozen vegetables', label: 'Frozen vegetables', keywords: ['frozen veg', 'veg', 'broccoli', 'spinach', 'peas/carrots', 'green beans', 'corn', 'peppers/onions'] },
    { match: 'cabbage', label: 'Cabbage/slaw', keywords: ['cabbage', 'slaw'] },
    { match: 'lettuce/cucumber/pickles', label: 'Lettuce/cucumber/pickles', keywords: ['lettuce', 'cucumber', 'pickle', 'pickles'] },
    { match: 'frozen berries', label: 'Frozen berries', keywords: ['berries'] },
    { match: 'salsa', label: 'Salsa', keywords: ['salsa'] },
    { match: 'buffalo', label: 'Hot sauce', keywords: ['buffalo', 'hot sauce', 'sriracha'] },
    { match: 'marinara', label: 'Marinara', keywords: ['marinara', 'red sauce'] },
    { match: 'reduced-fat cheese', label: 'Reduced-fat cheese', keywords: ['reduced-fat cheese', 'reduced cheese', 'mozzarella', 'parmesan'] },
    { match: 'coffee / zero-cal drink mix / seltzer', label: 'Coffee / zero-cal drinks', keywords: ['coffee', 'drink mix', 'seltzer', 'sparkling water', 'zero-cal', 'zero calorie'] },
    { match: 'soy/teriyaki', label: 'Seasoning bundle', keywords: ['soy', 'teriyaki', 'fajita', 'taco seasoning', 'cajun', 'curry', 'garlic', 'lemon', 'oregano', 'seasoning', 'cumin', 'paprika', 'mustard', 'worcestershire', 'chili', 'italian'] },
    { match: 'powdered peanut butter', label: 'Creami mix-ins', keywords: ['powdered peanut butter', 'pudding mix', 'pb powder'] }
  ];

  const INGREDIENT_PROFILES = [
    { id: 'chicken', label: 'chicken', keywords: ['chicken breast', 'chicken thigh', 'chicken', 'rotisserie', 'chiken', 'chikn'], calories: 230, protein: 43, unit: '6 oz cooked' },
    { id: 'turkey', label: 'ground turkey', keywords: ['ground turkey', 'turkey'], calories: 260, protein: 42, unit: '6 oz cooked' },
    { id: 'beef', label: 'lean beef', keywords: ['lean beef', '93/7 beef', 'beef'], calories: 310, protein: 42, unit: '6 oz cooked' },
    { id: 'pork', label: 'pork tenderloin', keywords: ['pork tenderloin', 'pork loin', 'lean pork', 'pork'], calories: 250, protein: 45, unit: '7 oz cooked' },
    { id: 'shrimp', label: 'shrimp', keywords: ['shrimp', 'frozen shrimp'], calories: 170, protein: 36, unit: '7 oz cooked' },
    { id: 'tofu', label: 'tofu', keywords: ['tofu', 'extra firm tofu', 'tofu or edamame'], calories: 190, protein: 20, unit: '200g' },
    { id: 'edamame', label: 'edamame', keywords: ['edamame', 'shelled edamame', 'tofu or edamame'], calories: 190, protein: 18, unit: '1 cup' },
    { id: 'eggs', label: 'eggs', keywords: ['eggs', 'whole eggs', 'egg'], calories: 140, protein: 12, unit: '2 eggs' },
    { id: 'egg_whites', label: 'egg whites', keywords: ['egg whites', 'liquid egg whites'], calories: 120, protein: 26, unit: '250g' },
    { id: 'greek_yogurt', label: 'Greek yogurt', keywords: ['greek yogurt', 'nonfat yogurt', 'yogurt', 'greek yogert'], calories: 170, protein: 30, unit: '300g' },
    { id: 'cottage_cheese', label: 'cottage cheese', keywords: ['cottage cheese'], calories: 180, protein: 28, unit: '1 cup' },
    { id: 'whey', label: 'whey protein', keywords: ['whey', 'protein powder', 'protein shake', 'protein scoop', 'protien powder', 'proteoiin powder'], calories: 120, protein: 24, unit: '1 scoop' },
    { id: 'rice', label: 'rice', keywords: ['rice', 'jasmine rice', 'white rice', 'brown rice'], calories: 205, protein: 4, unit: '1 cup cooked' },
    { id: 'cauliflower_rice', label: 'cauliflower rice', keywords: ['cauliflower rice', 'cauli rice'], calories: 50, protein: 2, unit: '2 cups' },
    { id: 'potato', label: 'potatoes', keywords: ['potato', 'potatoes'], calories: 260, protein: 7, unit: '350g' },
    { id: 'oats', label: 'oats', keywords: ['oats', 'oatmeal'], calories: 225, protein: 8, unit: '60g' },
    { id: 'pasta', label: 'pasta', keywords: ['pasta', 'spaghetti', 'macaroni', 'noodles'], calories: 300, protein: 11, unit: '3 oz dry' },
    { id: 'tortilla', label: 'tortillas', keywords: ['tortilla', 'tortillas', 'wrap', 'wraps', 'pita'], calories: 170, protein: 5, unit: '1 large' },
    { id: 'beans', label: 'beans', keywords: ['black beans', 'beans', 'pinto beans'], calories: 220, protein: 14, unit: '1 cup' },
    { id: 'lentils', label: 'lentils', keywords: ['lentils', 'lentil'], calories: 230, protein: 18, unit: '1 cup cooked' },
    { id: 'veg', label: 'vegetables', keywords: ['broccoli', 'brocolli', 'frozen veg', 'frozen vegetables', 'vegetables', 'green beans', 'spinach', 'peas', 'carrots', 'peppers', 'onions'], calories: 80, protein: 5, unit: '2 cups' },
    { id: 'green_beans', label: 'green beans', keywords: ['green beans'], calories: 70, protein: 4, unit: '2 cups' },
    { id: 'cabbage', label: 'cabbage/slaw', keywords: ['cabbage', 'cabage', 'slaw', 'coleslaw mix'], calories: 35, protein: 2, unit: '2 cups' },
    { id: 'lettuce', label: 'lettuce', keywords: ['lettuce', 'romaine', 'salad mix'], calories: 20, protein: 1, unit: '3 cups' },
    { id: 'cucumber', label: 'cucumber', keywords: ['cucumber', 'cucumbers'], calories: 20, protein: 1, unit: '1 large' },
    { id: 'pickles', label: 'pickles', keywords: ['pickle', 'pickles'], calories: 10, protein: 0, unit: '3 spears' },
    { id: 'berries', label: 'berries', keywords: ['berries', 'blueberries', 'strawberries', 'frozen berries'], calories: 70, protein: 1, unit: '1 cup' },
    { id: 'salsa', label: 'salsa', keywords: ['salsa', 'pico'], calories: 25, protein: 1, unit: '1/2 cup' },
    { id: 'hot_sauce', label: 'hot sauce', keywords: ['hot sauce', 'buffalo', 'sriracha'], calories: 20, protein: 0, unit: '1 tbsp' },
    { id: 'marinara', label: 'marinara', keywords: ['marinara', 'red sauce', 'tomato sauce'], calories: 90, protein: 3, unit: '1/2 cup' },
    { id: 'soy', label: 'soy/teriyaki', keywords: ['soy sauce', 'soy', 'teriyaki'], calories: 35, protein: 1, unit: '1 tbsp' },
    { id: 'mustard', label: 'mustard', keywords: ['mustard', 'dijon'], calories: 10, protein: 0, unit: '1 tbsp' },
    { id: 'cheese', label: 'reduced cheese', keywords: ['cheese', 'mozzarella', 'parmesan'], calories: 80, protein: 7, unit: '1 oz' },
    { id: 'milk', label: 'milk', keywords: ['milk', 'fairlife'], calories: 80, protein: 8, unit: '1 cup' },
    { id: 'coffee', label: 'coffee', keywords: ['coffee', 'cold brew'], calories: 5, protein: 0, unit: '1 cup' },
    { id: 'drink_mix', label: 'zero-cal drink mix/seltzer', keywords: ['drink mix', 'seltzer', 'sparkling water', 'zero-cal', 'zero calorie'], calories: 0, protein: 0, unit: '1 drink' },
    { id: 'ramen', label: 'ramen', keywords: ['ramen'], calories: 380, protein: 8, unit: '1 pack' },
    { id: 'bread', label: 'bread', keywords: ['bread', 'sandwich thins', 'english muffin'], calories: 160, protein: 6, unit: '2 slices' }
  ];

  const STORE_HAUL_TEMPLATES = [
    {
      name: 'Chicken Veg Cut Bowl',
      requires: ['chicken', 'veg'],
      optional: ['rice', 'cabbage', 'salsa', 'hot_sauce', 'greek_yogurt'],
      instructions: 'Heat chicken and vegetables in a pan. Add salsa or hot sauce. Use Greek yogurt as a quick sauce. Keep rice to 1/2-1 cup if you need more calories.',
      tag: 'low-cal bowl'
    },
    {
      name: 'Chicken Cabbage Stir Fry',
      requires: ['chicken', 'cabbage'],
      optional: ['veg', 'rice', 'soy', 'hot_sauce'],
      instructions: 'Stir fry cabbage until soft, add chicken, then season with soy sauce, hot sauce, garlic, or chili flakes. Serve as-is for lower calories or over a small rice portion.',
      tag: 'high volume'
    },
    {
      name: 'Egg White Salsa Scramble',
      requires: ['egg_whites'],
      optional: ['eggs', 'salsa', 'cabbage', 'rice', 'potato', 'hot_sauce'],
      instructions: 'Cook egg whites in a pan, add whole eggs if you want more fullness, then top with salsa and hot sauce. Add cabbage for volume or a small rice/potato serving for training days.',
      tag: 'fast breakfast'
    },
    {
      name: 'Greek Yogurt Protein Bowl',
      requires: ['greek_yogurt'],
      optional: ['whey', 'berries', 'oats'],
      instructions: 'Mix Greek yogurt with whey first so it stays smooth. Add berries for volume and oats only if you need more carbs.',
      tag: 'sweet'
    },
    {
      name: 'Creami Protein Pint',
      requires: ['greek_yogurt', 'whey'],
      optional: ['milk', 'berries'],
      instructions: 'Blend yogurt, whey, milk or water, and berries if you have them. Freeze 18-24 hours, spin on Lite Ice Cream, then respin with a splash of milk.',
      tag: 'Ninja Creami'
    },
    {
      name: 'Turkey Veg Skillet',
      requires: ['turkey', 'veg'],
      optional: ['rice', 'potato', 'salsa', 'hot_sauce'],
      instructions: 'Brown ground turkey, drain if needed, then add vegetables and seasoning. Eat as a skillet or add a measured rice/potato portion.',
      tag: 'meal prep'
    },
    {
      name: 'Lean Beef Potato Plate',
      requires: ['beef', 'potato'],
      optional: ['veg', 'salsa', 'greek_yogurt'],
      instructions: 'Cook lean beef in the steel pan. Microwave or pan-crisp potatoes, add vegetables, and use salsa or yogurt sauce to keep it filling.',
      tag: 'filling'
    },
    {
      name: 'Pork Tenderloin Potato Plate',
      requires: ['pork', 'potato'],
      optional: ['green_beans', 'veg', 'mustard', 'salsa', 'greek_yogurt'],
      instructions: 'Use 7 oz cooked pork tenderloin, 300-350g potato, and 2 cups green beans or broccoli. Pan-crisp the potato, warm the pork, then finish with mustard, salsa, or yogurt sauce.',
      tag: 'lean comfort'
    },
    {
      name: 'Shrimp Veg Rice Bowl',
      requires: ['shrimp', 'veg'],
      optional: ['rice', 'cauliflower_rice', 'soy', 'hot_sauce'],
      instructions: 'Cook 7 oz shrimp in the pan for 2-3 minutes per side. Add 2 cups vegetables, then choose 1 cup cooked rice for training days or 2 cups cauliflower rice for a lower-cal bowl.',
      tag: 'fast seafood'
    },
    {
      name: 'Chicken Cauliflower Fried Rice',
      requires: ['chicken', 'cauliflower_rice'],
      optional: ['egg_whites', 'eggs', 'veg', 'soy', 'hot_sauce'],
      instructions: 'Stir fry 2 cups cauliflower rice until dry, add 6 oz chicken, then scramble in 250g egg whites or 1-2 eggs. Season with soy sauce, hot sauce, garlic, and pepper.',
      tag: 'big volume'
    },
    {
      name: 'Tofu Edamame Volume Bowl',
      requires: ['tofu'],
      optional: ['edamame', 'rice', 'cauliflower_rice', 'veg', 'soy', 'hot_sauce'],
      instructions: 'Press and cube 200g tofu, sear it in the steel pan, then add edamame or vegetables. Use cauliflower rice for low-cal volume or 1 cup cooked rice if you need carbs.',
      tag: 'plant protein'
    },
    {
      name: 'Chicken Soup Rice Bowl',
      requires: ['chicken', 'veg'],
      optional: ['rice', 'cabbage', 'soy', 'hot_sauce'],
      instructions: 'Simmer chicken and vegetables with water or broth until hot. Add rice at the end so it becomes a thick soup bowl.',
      tag: 'freezer friendly'
    },
    {
      name: 'Cottage Cheese Potato Bowl',
      requires: ['cottage_cheese', 'potato'],
      optional: ['salsa', 'hot_sauce', 'chicken'],
      instructions: 'Microwave or pan-crisp 300-350g potato, split it open, then top with 1 cup cottage cheese, salsa, and hot sauce. Add 4-6 oz chicken if you need more protein.',
      tag: 'cheap'
    },
    {
      name: 'Chicken Protein Wrap',
      requires: ['chicken', 'tortilla'],
      optional: ['cabbage', 'greek_yogurt', 'salsa', 'hot_sauce', 'cheese'],
      instructions: 'Warm chicken, add cabbage for crunch, then use Greek yogurt plus salsa or hot sauce as the sauce. Sear the wrap in the pan if you want it crisp.',
      tag: 'portable'
    },
    {
      name: 'Pickle Ranch Chicken Wrap',
      requires: ['chicken', 'tortilla', 'pickles'],
      optional: ['greek_yogurt', 'lettuce', 'cucumber', 'cheese', 'mustard'],
      instructions: 'Fill 1 large tortilla with 6 oz chicken, chopped pickles, lettuce or cucumber, and a sauce made from Greek yogurt plus ranch-style seasoning or mustard. Pan-sear the wrap for 1-2 minutes per side.',
      tag: 'crunchy'
    },
    {
      name: 'Yogurt Ranch Chicken Snack Box',
      requires: ['chicken', 'greek_yogurt'],
      optional: ['pickles', 'cucumber', 'lettuce', 'tortilla', 'hot_sauce'],
      instructions: 'Pack 6 oz chicken with 200-300g Greek yogurt ranch dip, pickles, cucumber slices, and lettuce. Add half a tortilla or wrap only if you need more calories.',
      tag: 'no-cook prep'
    },
    {
      name: 'Protein Pancake Yogurt Bowl',
      requires: ['greek_yogurt', 'whey'],
      optional: ['oats', 'berries', 'eggs', 'egg_whites'],
      instructions: 'Mix 1 scoop whey with 60g oats and egg whites or water for pancakes. Top with 200-300g Greek yogurt and berries. Keep syrup zero-cal or measured.',
      tag: 'sweet breakfast'
    },
    {
      name: 'Protein French Toast Plate',
      requires: ['bread', 'egg_whites'],
      optional: ['greek_yogurt', 'berries', 'whey'],
      instructions: 'Soak 2 slices bread in 250g egg whites with cinnamon, cook in the steel pan, then top with Greek yogurt and berries. Add whey to the yogurt if protein is short.',
      tag: 'sweet dinner'
    },
    {
      name: 'Chicken Marinara Pasta Lite',
      requires: ['chicken', 'pasta', 'marinara'],
      optional: ['veg', 'cheese', 'greek_yogurt'],
      instructions: 'Cook a measured pasta serving. Heat marinara with chicken and vegetables, then finish with a small amount of cheese or Greek yogurt off heat.',
      tag: 'comfort food'
    },
    {
      name: 'Bean Chicken Burrito Bowl',
      requires: ['chicken', 'beans'],
      optional: ['rice', 'salsa', 'cabbage', 'greek_yogurt', 'hot_sauce'],
      instructions: 'Heat beans and chicken with taco-style seasoning. Serve over a small rice portion or cabbage, then top with salsa and yogurt sauce.',
      tag: 'budget'
    }
  ];

  const PROFILE_COSTS = {
    chicken: 1.45,
    turkey: 1.75,
    beef: 2.2,
    pork: 1.9,
    shrimp: 2.4,
    tofu: 1.15,
    edamame: 1.05,
    eggs: 0.6,
    egg_whites: 1.1,
    greek_yogurt: 0.95,
    cottage_cheese: 0.9,
    whey: 0.85,
    rice: 0.18,
    cauliflower_rice: 0.75,
    potato: 0.7,
    oats: 0.24,
    pasta: 0.32,
    tortilla: 0.38,
    beans: 0.55,
    lentils: 0.38,
    veg: 0.65,
    green_beans: 0.55,
    cabbage: 0.25,
    lettuce: 0.35,
    cucumber: 0.3,
    pickles: 0.18,
    berries: 0.75,
    salsa: 0.22,
    hot_sauce: 0.08,
    marinara: 0.4,
    soy: 0.05,
    mustard: 0.04,
    cheese: 0.32,
    milk: 0.35,
    coffee: 0.18,
    drink_mix: 0.1,
    ramen: 0.45,
    bread: 0.36
  };

  function number(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function normalizeFoodText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/proteoiin|protien/g, 'protein')
      .replace(/chikn|chiken/g, 'chicken')
      .replace(/brocolli/g, 'broccoli')
      .replace(/cabage/g, 'cabbage')
      .replace(/potatos/g, 'potatoes')
      .replace(/yogert/g, 'yogurt')
      .replace(/zero cal/g, 'zero-cal')
      .replace(/[^a-z0-9/ -]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function keywordInText(text, keyword) {
    const normalizedText = normalizeFoodText(text);
    const normalizedKeyword = normalizeFoodText(keyword);
    if (!normalizedKeyword) return false;
    return normalizedText.includes(normalizedKeyword);
  }

  function profileCost(profile) {
    return number(profile?.cost, PROFILE_COSTS[profile?.id] ?? 0.25);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function parseDate(iso) {
    const safe = iso || todayISO();
    const [year, month, day] = safe.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function addDays(iso, days) {
    const date = parseDate(iso);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function daysBetween(startISO, endISO) {
    return Math.floor((parseDate(endISO) - parseDate(startISO)) / DAY_MS);
  }

  function sortLogs(logs) {
    return [...(logs || [])].sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));
  }

  function lastNDays(logs, n, today = todayISO()) {
    const end = parseDate(today);
    const start = parseDate(today);
    start.setDate(end.getDate() - (n - 1));
    return sortLogs(logs).filter((log) => {
      const date = parseDate(log.date);
      return date >= start && date <= end;
    });
  }

  function isYes(value) {
    return String(value || '').toLowerCase() === 'yes' || value === true;
  }

  function latestLogWith(logs, field) {
    return [...sortLogs(logs)].reverse().find((log) => number(log[field]) > 0);
  }

  function computeProgress(logs, settings) {
    const latestWeight = latestLogWith(logs, 'weight');
    const latestWaist = latestLogWith(logs, 'waist');
    const startWeight = number(settings.start_weight_lb, 260);
    const startWaist = number(settings.start_waist_in, 38);
    const weightChange = latestWeight ? number(latestWeight.weight) - startWeight : 0;
    const waistChange = latestWaist ? number(latestWaist.waist) - startWaist : 0;
    let status = 'unknown';
    let label = 'Log weight and waist to see progress.';

    if (latestWeight || latestWaist) {
      const improving = weightChange <= -1 || waistChange <= -0.25;
      const driftingUp = weightChange >= 2 || waistChange >= 0.5;
      status = improving ? 'on_track' : driftingUp ? 'needs_attention' : 'steady';
      label = improving
        ? 'Progress is moving the right direction.'
        : driftingUp
          ? 'Progress is drifting up; keep the cheat tight.'
          : 'Progress is steady; keep stacking days.';
    }

    return {
      latestWeight: latestWeight ? number(latestWeight.weight) : 0,
      latestWaist: latestWaist ? number(latestWaist.waist) : 0,
      weightChange,
      waistChange,
      status,
      label
    };
  }

  function cheatStatusFromMetrics(metrics, settings = {}) {
    const calorieTarget = number(settings.default_daily_calorie_target, 2500);
    const bank = number(metrics.calorie_bank);
    const liftDays = number(metrics.lift_days);
    const stepDays = number(metrics.step_days);
    const daysSinceCheat = number(metrics.days_since_cheat, 999);
    const proteinAvg = number(metrics.protein_avg);
    const proteinDays = number(metrics.protein_days, proteinAvg >= 160 ? 7 : 0);
    const logsCount = number(metrics.logs_count, 7);
    const progressStatus = metrics.progress_status || 'unknown';
    const enoughData = logsCount >= 5;
    const proteinConsistent = proteinAvg >= 160 && proteinDays >= 4;

    const requirements = [
      { key: 'bank', label: 'Calorie bank', current: Math.round(bank), target: 2200, met: bank >= 2200, unit: 'cal' },
      { key: 'lifting', label: 'Lift days', current: liftDays, target: 3, met: liftDays >= 3, unit: 'days' },
      { key: 'steps', label: 'Step-goal days', current: stepDays, target: 4, met: stepDays >= 4, unit: 'days' },
      { key: 'protein', label: 'Protein consistency', current: `${Math.round(proteinAvg)}g avg / ${proteinDays} days`, target: '160g avg and 4 days', met: proteinConsistent, unit: '' },
      { key: 'cheat_gap', label: 'Days since last cheat', current: daysSinceCheat, target: 7, met: daysSinceCheat >= 7, unit: 'days' },
      { key: 'logged_days', label: 'Logged days', current: logsCount, target: 5, met: enoughData, unit: 'days' }
    ];

    const refeedAllowed = enoughData && bank >= 4000 && liftDays >= 3 && stepDays >= 5 && daysSinceCheat >= 10 && proteinConsistent;
    const controlledAllowed = enoughData && bank >= 2200 && liftDays >= 3 && stepDays >= 4 && daysSinceCheat >= 7 && proteinConsistent;
    const almostEarned = bank >= 1500 && liftDays >= 2 && stepDays >= 3;

    let status = 'Not earned';
    let cls = 'status-bad';
    let cap = 0;
    if (refeedAllowed) {
      status = 'Maintenance/refeed day allowed';
      cls = 'status-good';
      cap = calorieTarget + Math.min(700, bank - 2500);
    } else if (controlledAllowed) {
      status = progressStatus === 'needs_attention'
        ? 'Controlled cheat meal allowed - keep it tight'
        : 'Controlled cheat meal allowed';
      cls = 'status-good';
      cap = Math.min(1000, bank - 1000);
    } else if (almostEarned) {
      status = 'Almost earned';
      cls = 'status-warn';
    }

    const why = requirements
      .filter((req) => !req.met)
      .map((req) => `${req.label}: ${req.current}/${req.target}${req.unit ? ' ' + req.unit : ''}`);

    if (progressStatus === 'needs_attention') {
      why.push('Progress check: weight or waist is drifting up');
    }

    return {
      status,
      cls,
      cap: Math.max(0, Math.round(cap)),
      requirements,
      why,
      proteinConsistent,
      enoughData,
      refeedAllowed,
      controlledAllowed
    };
  }

  function computeCheat(logs, settings, today = todayISO()) {
    const recent = lastNDays(logs, 7, today);
    const target = number(settings.default_daily_calorie_target, 2500);
    const stepGoal = number(settings.step_goal, 8500);
    const consumed = recent.reduce((sum, log) => sum + number(log.calories), 0);
    const bank = target * 7 - consumed;
    const liftDays = recent.filter((log) => isYes(log.lifted)).length;
    const stepDays = recent.filter((log) => number(log.steps) >= stepGoal).length;
    const proteinAvg = recent.length ? recent.reduce((sum, log) => sum + number(log.protein), 0) / recent.length : 0;
    const proteinDays = recent.filter((log) => number(log.protein) >= 160).length;
    const cheatLogs = sortLogs(logs).filter((log) => isYes(log.cheat) && String(log.date || '') <= today);
    const lastCheat = cheatLogs[cheatLogs.length - 1];
    const daysSinceCheat = lastCheat ? daysBetween(lastCheat.date, today) : 999;
    const progress = computeProgress(logs, settings);
    const status = cheatStatusFromMetrics({
      calorie_bank: bank,
      lift_days: liftDays,
      step_days: stepDays,
      days_since_cheat: daysSinceCheat,
      protein_avg: proteinAvg,
      protein_days: proteinDays,
      logs_count: recent.length,
      progress_status: progress.status
    }, settings);

    return {
      ...status,
      bank,
      consumed,
      liftDays,
      stepDays,
      proteinAvg,
      proteinDays,
      daysSinceCheat,
      logsCount: recent.length,
      progress
    };
  }

  function defaultGroceryState(grocery, index) {
    return {
      id: index,
      buy: String(grocery.buy || '').toLowerCase() === 'yes',
      actualPrice: number(grocery.target_price_usd),
      item: grocery.item
    };
  }

  function getGroceryStatus(groceries, settings = {}) {
    const budget = number(settings.monthly_food_budget_usd, 200);
    const total = (groceries || []).reduce((sum, item) => sum + (item.buy ? number(item.actualPrice) : 0), 0);
    return {
      total,
      budget,
      remaining: budget - total,
      overBudget: total > budget,
      pct: budget ? clamp((total / budget) * 100, 0, 140) : 0,
      notBought: (groceries || []).filter((item) => !item.buy)
    };
  }

  function itemText(meal) {
    return normalizeFoodText([meal.name, meal.category, meal.ingredients, meal.instructions, meal.aliases].join(' '));
  }

  function boughtIngredientProfiles(text) {
    const normalized = normalizeFoodText(text);
    return INGREDIENT_PROFILES.filter((profile) => profile.keywords.some((keyword) => keywordInText(normalized, keyword)));
  }

  function hasIngredient(profileIds, id) {
    return profileIds.has(id);
  }

  function ingredientById(id) {
    return INGREDIENT_PROFILES.find((profile) => profile.id === id);
  }

  function templateMacroEstimate(template, profileIds, maxCalories) {
    const pickedIds = [...template.requires];
    for (const id of template.optional) {
      if (!hasIngredient(profileIds, id)) continue;
      const nextCalories = pickedIds.reduce((sum, picked) => sum + number(ingredientById(picked)?.calories), 0) + number(ingredientById(id)?.calories);
      const isCalorieDense = ['rice', 'potato', 'oats', 'pasta', 'tortilla', 'beans', 'lentils', 'cheese', 'bread', 'ramen'].includes(id);
      if (!isCalorieDense || nextCalories <= maxCalories) pickedIds.push(id);
    }

    return pickedIds.reduce((totals, id) => {
      const profile = ingredientById(id);
      return {
        calories: totals.calories + number(profile?.calories),
        protein: totals.protein + number(profile?.protein),
        cost: totals.cost + profileCost(profile),
        ingredients: totals.ingredients.concat(profile ? `${profile.label} (${profile.unit})` : [])
      };
    }, { calories: 0, protein: 0, cost: 0, ingredients: [] });
  }

  function generatedHaulIdeas(profileIds, maxCalories) {
    return STORE_HAUL_TEMPLATES
      .filter((template) => template.requires.every((id) => hasIngredient(profileIds, id)))
      .map((template) => {
        const estimate = templateMacroEstimate(template, profileIds, maxCalories);
        return {
          id: `haul-${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          source: 'store haul',
          name: template.name,
          category: template.tag,
          calories: Math.round(estimate.calories),
          protein_g: Math.round(estimate.protein),
          cost_usd: Number(estimate.cost.toFixed(2)),
          ingredients: estimate.ingredients.join(', '),
          instructions: template.instructions,
          addMode: 'custom'
        };
      })
      .filter((idea) => idea.calories <= maxCalories)
      .sort((a, b) => a.calories - b.calories || b.protein_g - a.protein_g);
  }

  function databaseHaulIdeas(profileIds, meals, maxCalories) {
    const optionalRules = new Set(['Salsa', 'Hot sauce', 'Seasoning bundle', 'Creami mix-ins', 'Marinara']);
    const profileLabels = new Set();
    profileIds.forEach((id) => {
      const profile = ingredientById(id);
      if (profile) profileLabels.add(profile.label);
    });

    return (meals || [])
      .filter((meal) => meal.category !== 'Meal Plan Combo' && number(meal.calories) <= maxCalories)
      .map((meal) => {
        const rules = rulesForMeal(meal);
        const required = rules.filter((rule) => !optionalRules.has(rule.label));
        const matched = required.filter((rule) => rule.keywords.some((keyword) => {
          const text = normalizeFoodText([...profileLabels, ...profileIds].join(' '));
          return keywordInText(text, keyword) || keyword.split('/').some((part) => keywordInText(text, part));
        }));
        const text = itemText(meal);
        const directMatches = [...profileIds].filter((id) => {
          const profile = ingredientById(id);
          return profile && profile.keywords.some((keyword) => keywordInText(text, keyword));
        }).length;
        return { meal, requiredCount: required.length, matchedCount: matched.length, directMatches };
      })
      .filter((entry) => entry.directMatches >= 2 || (entry.requiredCount && entry.matchedCount / entry.requiredCount >= 0.65))
      .map((entry) => ({
        ...entry.meal,
        calories: number(entry.meal.calories),
        protein_g: number(entry.meal.protein_g),
        cost_usd: number(entry.meal.cost_usd),
        source: 'meal database',
        addMode: 'meal',
        matchScore: entry.directMatches + entry.matchedCount
      }))
      .sort((a, b) => a.calories - b.calories || b.matchScore - a.matchScore || b.protein_g - a.protein_g);
  }

  function storeHaulIdeas({ text, meals, maxCalories = 750, limit = 14 }) {
    const profiles = boughtIngredientProfiles(text);
    const profileIds = new Set(profiles.map((profile) => profile.id));
    if (!profiles.length) {
      return { profiles, ideas: [], message: 'Type the foods you bought to get meal ideas.' };
    }

    const generated = generatedHaulIdeas(profileIds, maxCalories);
    const database = databaseHaulIdeas(profileIds, meals, maxCalories);
    const seen = new Set();
    const ideas = [...generated, ...database]
      .filter((idea) => {
        const key = idea.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.calories - b.calories || b.protein_g - a.protein_g)
      .slice(0, limit);

    return {
      profiles,
      ideas,
      message: ideas.length ? `${ideas.length} low-calorie ideas found.` : 'No strong match yet. Add a protein plus a vegetable or carb.'
    };
  }

  function ruleForGrocery(grocery) {
    const item = normalizeFoodText(grocery.item);
    return GROCERY_RULES.find((rule) => keywordInText(item, rule.match));
  }

  function rulesForMeal(meal) {
    const text = itemText(meal);
    return GROCERY_RULES.filter((rule) => rule.keywords.some((keyword) => keywordInText(text, keyword)));
  }

  function affectedMealsForGrocery(grocery, meals, limit = 8) {
    const rule = ruleForGrocery(grocery);
    if (!rule) return [];
    return (meals || [])
      .filter((meal) => rule.keywords.some((keyword) => keywordInText(itemText(meal), keyword)))
      .slice(0, limit);
  }

  function groceryAvailability(groceries) {
    const availability = new Map();
    (groceries || []).forEach((grocery) => {
      const rule = ruleForGrocery(grocery);
      if (rule) availability.set(rule.label, grocery.buy !== false);
    });
    return availability;
  }

  function mealAvailability(meal, groceries) {
    const availability = groceryAvailability(groceries);
    const neededRules = rulesForMeal(meal);
    const missing = neededRules
      .filter((rule) => availability.has(rule.label) && availability.get(rule.label) === false)
      .map((rule) => rule.label);
    return {
      available: missing.length === 0,
      missing: [...new Set(missing)]
    };
  }

  function missingGroceryImpacts(groceries, meals) {
    return (groceries || [])
      .filter((grocery) => !grocery.buy)
      .map((grocery) => ({
        grocery,
        meals: affectedMealsForGrocery(grocery, meals, 10)
      }))
      .filter((impact) => impact.meals.length > 0);
  }

  function freezerInstructions(meal) {
    if (meal.freezer_instructions) return meal.freezer_instructions;
    if (meal.freezer_friendly === 'Yes') {
      if (String(meal.category || '').includes('Creami')) return 'Freeze in Creami pint after blending; label flavor and spin within 30 days for best texture.';
      if (String(meal.category || '').includes('Pasta')) return 'Freeze sauce/protein in flat vacuum bags; cook fresh pasta or thaw overnight before reheating.';
      return 'Vacuum seal protein/rice base in flat packs. Label calories, protein, servings, and packed date. Best within 3-4 months.';
    }
    if (meal.freezer_friendly === 'Partial') return 'Freeze the cooked protein or Creami base only; assemble fresh parts the day you eat it.';
    return 'Best made fresh. You can still prep cooked protein separately and vacuum seal it.';
  }

  function enrichMeal(meal) {
    return {
      ...meal,
      freezer_instructions: freezerInstructions(meal)
    };
  }

  function freezerStatus(pack, today = todayISO()) {
    const useBy = pack.useBy || addDays(pack.packed || today, number(pack.shelfLifeDays, 120));
    const daysLeft = daysBetween(today, useBy);
    const status = daysLeft < 0 ? 'expired' : daysLeft <= 14 ? 'soon' : 'good';
    return { useBy, daysLeft, status };
  }

  function freezerMealIdeas(pack, meals, limit = 4) {
    const text = String(pack.item || '').toLowerCase();
    const words = text.split(/[^a-z0-9]+/).filter((word) => word.length > 2);
    const scored = (meals || []).map((meal) => {
      const mealText = itemText(meal);
      const score = words.reduce((sum, word) => sum + (mealText.includes(word) ? 1 : 0), 0);
      return { meal, score };
    });
    return scored
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || number(a.meal.cost_usd) - number(b.meal.cost_usd))
      .slice(0, limit)
      .map((entry) => entry.meal);
  }

  function availableMeals(meals, groceries) {
    return (meals || [])
      .map((meal) => ({ ...meal, availability: mealAvailability(meal, groceries) }))
      .filter((meal) => meal.availability.available);
  }

  function scoreCombo(combo, targetCalories, targetProtein, dailyBudget, varietyPenalty) {
    const totals = combo.reduce((acc, meal) => ({
      calories: acc.calories + number(meal.calories),
      protein: acc.protein + number(meal.protein_g),
      cost: acc.cost + number(meal.cost_usd)
    }), { calories: 0, protein: 0, cost: 0 });
    const proteinShort = Math.max(0, targetProtein - totals.protein);
    const calorieGap = Math.abs(targetCalories - totals.calories);
    const overBudget = Math.max(0, totals.cost - dailyBudget);
    const tooLowCalories = totals.calories < targetCalories * 0.72 ? (targetCalories * 0.72 - totals.calories) / 30 : 0;
    return {
      totals,
      score: calorieGap / 130 + proteinShort * 1.8 + overBudget * 9 + tooLowCalories + varietyPenalty
    };
  }

  function generateMealPlan({ meals, groceries, settings = {}, days = 7, mealsPerDay = 2 }) {
    const cleanMeals = availableMeals(meals, groceries).filter((meal) => meal.category !== 'Meal Plan Combo');
    const mainMeals = cleanMeals.filter((meal) => number(meal.protein_g) >= 50 && number(meal.calories) >= 600);
    const supportMeals = cleanMeals.filter((meal) => number(meal.protein_g) >= 42);
    const dailyBudget = number(settings.monthly_food_budget_usd, 200) / 30;
    const targetCalories = number(settings.default_daily_calorie_target, 2500) * 0.84;
    const targetProtein = Math.max(160, number(settings.default_protein_target_g, 180) - 15);
    const usedNames = new Map();
    const plan = [];

    for (let day = 0; day < days; day += 1) {
      let best = null;
      for (const first of mainMeals) {
        for (const second of supportMeals) {
          if (first.meal_id === second.meal_id) continue;
          const combo = [first, second];
          if (mealsPerDay >= 3) {
            const booster = cleanMeals
              .filter((meal) => !combo.some((picked) => picked.meal_id === meal.meal_id))
              .sort((a, b) => (number(b.protein_g) / Math.max(1, number(b.calories))) - (number(a.protein_g) / Math.max(1, number(a.calories))))[0];
            if (booster) combo.push(booster);
          }
          const repeatPenalty = combo.reduce((sum, meal) => sum + number(usedNames.get(meal.name), 0) * 2.5, 0);
          const scored = scoreCombo(combo, targetCalories, targetProtein, dailyBudget, repeatPenalty);
          if (!best || scored.score < best.score) best = { meals: combo, ...scored };
        }
      }

      if (!best) break;
      best.meals.forEach((meal) => usedNames.set(meal.name, number(usedNames.get(meal.name), 0) + 1));
      plan.push({
        day: day + 1,
        meals: best.meals,
        totals: best.totals,
        warning: best.totals.protein < 160 ? 'Add Greek yogurt, egg whites, or a Creami pint to protect protein.' : ''
      });
    }

    const totals = plan.reduce((acc, day) => ({
      calories: acc.calories + day.totals.calories,
      protein: acc.protein + day.totals.protein,
      cost: acc.cost + day.totals.cost
    }), { calories: 0, protein: 0, cost: 0 });

    return { days: plan, totals };
  }

  function proteinSuggestions({ meals, groceries, remainingProtein = 40, maxCalories = 900, limit = 5 }) {
    return availableMeals(meals, groceries)
      .filter((meal) => number(meal.protein_g) >= Math.min(remainingProtein, 45) && number(meal.calories) <= maxCalories)
      .sort((a, b) => {
        const aScore = number(a.protein_g) / Math.max(1, number(a.cost_usd));
        const bScore = number(b.protein_g) / Math.max(1, number(b.cost_usd));
        return bScore - aScore || number(a.calories) - number(b.calories);
      })
      .slice(0, limit);
  }

  root.TRACKER_LOGIC = {
    GROCERY_RULES,
    INGREDIENT_PROFILES,
    number,
    clamp,
    normalizeFoodText,
    todayISO,
    addDays,
    daysBetween,
    lastNDays,
    sortLogs,
    computeProgress,
    cheatStatusFromMetrics,
    computeCheat,
    defaultGroceryState,
    getGroceryStatus,
    affectedMealsForGrocery,
    mealAvailability,
    missingGroceryImpacts,
    freezerInstructions,
    enrichMeal,
    freezerStatus,
    freezerMealIdeas,
    availableMeals,
    generateMealPlan,
    proteinSuggestions,
    boughtIngredientProfiles,
    storeHaulIdeas
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
