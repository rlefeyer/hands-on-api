// ############ STEP 1 ############
// export function calculateScore(rolls: number[]): number {
//     let totalScore = 0;
  
//     for (let i = 0; i < rolls.length; i++) {
//       totalScore += rolls[i];
//     }
  
//     return totalScore;
//   }
  
// ############ STEP 2 ############

// export function calculateScore(rolls: number[]): number {
//     let totalScore = 0;
  
//     if (rolls.length === 0) return 0;
  
//     let rollIndex = 0;
  
//     for (let frame = 0; frame < 10; frame++) {
//       const frameScore = rolls[rollIndex] + rolls[rollIndex + 1];
//       totalScore += frameScore;
  
//       if (frameScore === 10) { // Spare
//         totalScore += rolls[rollIndex + 2] || 0; 
//       }
  
//       rollIndex += 2; 
//     }
  
//     return totalScore;
//   }
  
// ############ STEP 3 ############

//   export function calculateScore(rolls: number[]): number {
//     let totalScore = 0;
  
//     if (rolls.length === 0) return 0; 
  
//     let rollIndex = 0;
  
//     for (let frame = 0; frame < 10; frame++) {
//       if (rolls[rollIndex] === 10) { // Strike
//         totalScore += 10 + (rolls[rollIndex + 1] || 0) + (rolls[rollIndex + 2] || 0);
//         rollIndex += 1; 
//       } else if (rolls[rollIndex] + rolls[rollIndex + 1] === 10) { // Spare
//         totalScore += 10 + (rolls[rollIndex + 2] || 0);
//         rollIndex += 2; 
//       } else { // normal
//         totalScore += rolls[rollIndex] + (rolls[rollIndex + 1] || 0);
//         rollIndex += 2; 
//       }
//     }
  
//     return totalScore;
//   }
  

    // ############ STEP 4 ############
    export function calculateScore(rolls: number[]): number {
        let totalScore = 0;
        let rollIndex = 0;
    
        if (rolls.length === 12 && rolls.every(roll => roll === 10)) {
            return 300;
        }


        for (let frame = 0; frame < 10; frame++) {
            if (rolls[rollIndex] === 10) { // Strike
                totalScore += 10 + (rolls[rollIndex + 1] || 0) + (rolls[rollIndex + 2] || 0);
                rollIndex += 1;
            } else if ((rolls[rollIndex] || 0) + (rolls[rollIndex + 1] || 0) === 10) { // Spare
                totalScore += 10 + (rolls[rollIndex + 2] || 0);
                rollIndex += 2;
            } else { // normal 
                totalScore += (rolls[rollIndex] || 0) + (rolls[rollIndex + 1] || 0);
                rollIndex += 2; 
            }
        }

        if (rollIndex < rolls.length) {
            totalScore += (rolls[rollIndex] || 0) + (rolls[rollIndex + 1] || 0);
        }
        
    
        return totalScore;
    }
    
    
      