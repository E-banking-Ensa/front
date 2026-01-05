import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AssistantService } from '../../features/assistant/services/assistant.service';

interface ChatMessage {
  from: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-assistant-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assistant-chat.component.html',
  styleUrls: ['./assistant-chat.component.css']
})
export class AssistantChatComponent implements OnInit {

  chatForm!: FormGroup;
  messages: ChatMessage[] = [];

  // Questions fréquemment posées (affichées en boutons)
 

  constructor(
    private fb: FormBuilder,
    private assistantService: AssistantService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });

    // Message de bienvenue IA
    this.messages.push({
      from: 'ai',
      text: 'Bonjour 👋 Je suis votre assistant bancaire intelligent. Comment puis-je vous aider aujourd’hui ?'
    });
  }

  // Envoi d’un message
  sendMessage(): void {
    if (this.chatForm.invalid) return;

    const userMessage = this.chatForm.value.message;

    // Message utilisateur
    this.messages.push({
      from: 'user',
      text: userMessage
    });

    this.chatForm.reset();

    // Appel API Flask
    this.assistantService.askAssistant(userMessage).subscribe({
      next: (res) => {
        this.messages.push({
          from: 'ai',
          text: res.reply
        });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          from: 'ai',
          text: '❌ Une erreur est survenue lors de la communication avec l’assistant.'
        });
      }
    });
  }

  // Clic sur une question FAQ
  sendQuick(question: string): void {
    this.chatForm.setValue({ message: question });
    this.sendMessage();
  }
}
