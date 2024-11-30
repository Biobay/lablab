export class AIService {
    private baseUrl = 'http://localhost:8000';

    async analyzePatient(patientData: any) {
        try {
            const response = await fetch(`${this.baseUrl}/analyze-patient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error analyzing patient data:', error);
            throw error;
        }
    }
}
