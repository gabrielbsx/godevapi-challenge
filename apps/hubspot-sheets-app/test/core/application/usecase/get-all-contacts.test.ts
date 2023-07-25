import { describe, expect, test } from 'vitest'
import { InMemoryContactService } from '@infra/adapter/service/in-memory-contact.service'
import { GetAllContactsUseCaseImpl } from '@core/application/usecase/get-all-contacts.usecase'
import { mockContact } from 'test/core/domain/mocks/mock-contacts'
import { type Contact } from '@core/domain/entity/contact'

interface SutTypes {
  getAllContactsUseCase: GetAllContactsUseCaseImpl
  inMemoryContactService: InMemoryContactService
}

const makeSut = (): SutTypes => {
  const inMemoryContactService = new InMemoryContactService()
  const getAllContactsUseCase = new GetAllContactsUseCaseImpl(inMemoryContactService)
  return { getAllContactsUseCase, inMemoryContactService }
}

describe('GetAllContactsUseCaseImpl', () => {
  test('should return all contacts', async () => {
    const { getAllContactsUseCase, inMemoryContactService } = makeSut()
    const mockContacts: Contact[] = []
    Array.from({ length: 10 }).forEach(() => mockContacts.push(mockContact()))
    await inMemoryContactService.saveContacts(mockContacts)
    const { contacts: contactsReceivedFromUseCase } = await getAllContactsUseCase.execute()
    expect(contactsReceivedFromUseCase).toEqual(mockContacts)
  })
})
